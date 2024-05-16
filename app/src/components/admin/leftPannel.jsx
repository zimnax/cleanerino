import css from "./admin.module.css";
import { ReactSVG } from "react-svg";
import { HandySvg } from "handy-svg";
import group from "../../svg/solar_cart-linear.svg";
import groupTrue from "../../svg/solar_cart-linearTrue.svg";
import customersGrey from "../../svg/customersGrey.svg";
import customersGreen from "../../svg/customersGreen.svg";
import userSvg from "../../svg/User.svg";
import userSvgTrue from "../../svg/UserTrue.svg";
import logOut from "../../svg/Login.svg";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../function/firebase";
import checkO from "../../svg/orderInDash.svg";
const LeftPannel = ({
  dashBordS,
  setDashBoardS,
  order,
  setOrder,
  product,
  setProduct,
  discount,
  setDiscount,
  customer,
  setCustomer,
  chat,
  setChat,
  setSettings,
  settings,
  users,
}) => {
  const handleClick = (panel) => {
    setDashBoardS(panel === "dashboard");
    setOrder(panel === "orders");
    setProduct(panel === "products");
    setDiscount(panel === "discounts");
    setCustomer(panel === "customers");
    setChat(panel === "chat");
    setSettings(panel === "settings");
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className={css.leftPannelWrap}>
      <div className={css.leftPFirstWrap}>
        <ul className={css.ulDash}>
          <li
            className={order ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("orders")}
          >
            {order ? (
              <ReactSVG src={customersGreen} />
            ) : (
              <ReactSVG src={customersGrey} />
            )}
            <span className={order ? css.liSpanTrue : css.liSpan}>
              Customers
            </span>
          </li>
        </ul>
      </div>
      <div className={css.secondDashWrap}>
        <div
          className={css.wrapNameIcon}
          onClick={() => handleClick("settings")}
        >
          {users && users.photo && (
            <img className={css.iconVendor} src={users.photo} />
          )}
          {users && !users.photo && (
            <div className={css.withoutPhoto}>{users.user_name[0]}</div>
          )}
          {users && (
            <p className={css.nameVendor}>
              {users.user_name}&nbsp; {users.last_name}
            </p>
          )}
        </div>
        <div className={css.line}></div>
        <div
          className={css.wrapProfSet}
          onClick={() => handleClick("settings")}
        >
          {settings ? (
            <ReactSVG src={userSvgTrue} />
          ) : (
            <ReactSVG src={userSvg} />
          )}

          <span className={settings ? css.liSpanTrue : css.liSpan}>
            Profile & Settings
          </span>
        </div>
        <div className={css.wrapProfSetTwo} onClick={signOutUser}>
          <ReactSVG src={logOut} />
          <span className={css.liSpan}>Logout</span>
        </div>
      </div>
    </div>
  );
};
export default LeftPannel;

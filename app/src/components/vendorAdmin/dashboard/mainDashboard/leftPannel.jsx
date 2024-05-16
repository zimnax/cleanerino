import css from "../dashboard.module.css";
import { ReactSVG } from "react-svg";
import { HandySvg } from "handy-svg";
import { Link } from "react-router-dom";
import group from "../../../../svg/solar_cart-linear.svg";
import groupTrue from "../../../../svg/solar_cart-linearTrue.svg";
import tune from "../../../../svg/Tune.svg";
import tuneTrue from "../../../../svg/Tunetrue.svg";
import logo from "../../../../svg/logo-inline.svg";
import prod from "../../../../svg/Inventory.svg";
import prodTrue from "../../../../svg/InventoryTrue.svg";
import tag from "../../../../svg/Tag.svg";
import tagTrue from "../../../../svg/TagTrue.svg";
import mult from "../../../../svg/UserMultiple.svg";
import multTrue from "../../../../svg/UserMultipleTrue.svg";
import chatLog from "../../../../svg/Comment.svg";
import chatLogTrue from "../../../../svg/CommentTrue.svg";
import iconK from "../../../../svg/Ellipse1.png";
import userSvg from "../../../../svg/User.svg";
import userSvgTrue from "../../../../svg/UserTrue.svg";
import logOut from "../../../../svg/Login.svg";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../../function/firebase";
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
        <Link to="/">
          <ReactSVG src={logo} />
        </Link>
        <ul className={css.ulDash}>
          <li
            className={dashBordS ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("dashboard")}
          >
            {dashBordS ? <ReactSVG src={tuneTrue} /> : <ReactSVG src={tune} />}
            <span className={dashBordS ? css.liSpanTrue : css.liSpan}>
              Dashboard
            </span>
          </li>
          <li
            className={order ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("orders")}
          >
            {order ? <ReactSVG src={groupTrue} /> : <ReactSVG src={group} />}
            <span className={order ? css.liSpanTrue : css.liSpan}>Orders</span>
          </li>
          <li
            className={product ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("products")}
          >
            {product ? <ReactSVG src={prodTrue} /> : <ReactSVG src={prod} />}
            <span className={product ? css.liSpanTrue : css.liSpan}>
              Products
            </span>
          </li>
          <li
            className={discount ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("discounts")}
          >
            {discount ? <ReactSVG src={tagTrue} /> : <ReactSVG src={tag} />}
            <span className={discount ? css.liSpanTrue : css.liSpan}>
              Discounts
            </span>
          </li>
          <li
            className={customer ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("customers")}
          >
            {customer ? <ReactSVG src={multTrue} /> : <ReactSVG src={mult} />}
            <span className={customer ? css.liSpanTrue : css.liSpan}>
              Customers
            </span>
          </li>
          <li
            className={chat ? css.liDashTrue : css.liDash}
            onClick={() => handleClick("chat")}
          >
            {chat ? <ReactSVG src={chatLogTrue} /> : <ReactSVG src={chatLog} />}
            <span className={chat ? css.liSpanTrue : css.liSpan}>Chat</span>
          </li>
        </ul>
      </div>
      <div className={css.secondDashWrap}>
        <div className={css.wrapNameIcon}>
          {users && users.photo && (
            <img className={css.iconVendor} src={users.photo} />
          )}
          {users && !users.photo && (
            <img className={css.iconVendor} src={iconK} />
          )}
          {users && (
            <p className={css.nameVendor}>
              {users.first_name}&nbsp; {users.last_name}
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

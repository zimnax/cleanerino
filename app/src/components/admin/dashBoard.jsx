import { useEffect, useState } from "react";
import css from "./admin.module.css";
import LeftPannel from "./leftPannel";

import withMySQLData from "../HOK/withMySQLData";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../function/firebase";
import UserList from "./userList";

const DashBoard = ({ activeUser, data }) => {
  const [dashBordS, setDashBoardS] = useState(true);
  const [order, setOrder] = useState(false);
  const [users, setUsers] = useState(null);
  const [product, setProduct] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [chat, setChat] = useState(false);
  const [settings, setSettings] = useState(true);

  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  // useEffect(() => {
  //   if (activeUser === "") {
  //     window.location.href = "/signin";
  //   }
  //   if (activeUser && data && data.users) {
  //     const found = data.users.find(
  //       (item) => item.firebaseId === activeUser.uid
  //     );

  //     if (found) {
  //       setUsers(found);
  //     } else {
  //       // signOutUser();
  //       // window.location.href = "/signin";
  //     }
  //   }
  // }, [data, activeUser]);

  return (
    <div className={css.wrapDashboardAll}>
      <LeftPannel
        setSettings={setSettings}
        settings={settings}
        dashBordS={dashBordS}
        setDashBoardS={setDashBoardS}
        order={order}
        setOrder={setOrder}
        product={product}
        setProduct={setProduct}
        discount={discount}
        setDiscount={setDiscount}
        customer={customer}
        setCustomer={setCustomer}
        chat={chat}
        setChat={setChat}
        users={users}
      />
      <div className={css.rightPannelWrap}>
        <UserList />
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(DashBoard);

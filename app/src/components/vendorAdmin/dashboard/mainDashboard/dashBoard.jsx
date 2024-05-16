import { useEffect, useState } from "react";
import css from "../dashboard.module.css";
import LeftPannel from "./leftPannel";
import Dash from "./standartComponent/dash";
import ProfileSettings from "../profileSettings/profileSettings";
import withMySQLData from "../../../HOK/withMySQLData";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../../../function/firebase";
import AddProductDashboard from "./standartComponent/addProductDashboard";
import ProductList from "./standartComponent/ProductList";
import Orders from "./standartComponent/orders/orders";
import Customers from "./standartComponent/customer/customers";
const DashBoard = ({ activeUser, data }) => {
  const [dashBordS, setDashBoardS] = useState(true);
  const [order, setOrder] = useState(false);
  const [users, setUsers] = useState(null);
  const [product, setProduct] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [chat, setChat] = useState(false);
  const [settings, setSettings] = useState(false);
  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    if (activeUser && data && data.length > 0) {
      const found = data.find((item) => item.firebase_id === activeUser.uid);
      if (found) {
        setUsers(found);
      } else {
        console.log("Notfound");
        signOutUser();
        window.location.href = "/vendorRegistration";
      }
    }
  }, [data, activeUser]);
  console.log("activeUser", activeUser);
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
        {dashBordS && <Dash />}
        {settings && (
          <ProfileSettings
            activeUser={activeUser}
            setUsers={setUsers}
            users={users}
          />
        )}
        {product && <ProductList setProduct={setProduct} users={users} />}
        {order && <Orders users={users} />}
        {customer && <Customers users={users} />}
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
)(DashBoard);

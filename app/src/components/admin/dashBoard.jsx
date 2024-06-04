import { useEffect, useState } from "react";
import css from "./admin.module.css";
import LeftPannel from "./leftPannel";
import { useLocation } from "react-router-dom";

import withMySQLData from "../HOK/withMySQLData";
import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../../function/firebase";
import UserList from "./userList";
import VendorList from "./vendorList";
import VendorsProducts from "./vendorsProducts";
import VendorProfileOne from "./vendorProfileOne";
import ProductList from "./productList/productList";
import Product from "./oneProduct/product";

const DashBoard = ({ activeUser, data }) => {
  const [dashBordS, setDashBoardS] = useState(true);
  const [order, setOrder] = useState(false);
  const [users, setUsers] = useState(null);
  const [product, setProduct] = useState(false);
  const [vendors, setVendors] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [chat, setChat] = useState(false);
  const [settings, setSettings] = useState(true);
  const [admProdList, setAdmProdList] = useState(false);
  const [vendorProfile, setVendorProfile] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(false);
  const location = useLocation();

  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    if (location.pathname === "/admin/vendors") {
      setCustomer(false);
      setVendors(true);
      setAdmProdList(false);
      setVendorProfile(false);
      setProduct(false);
      setCurrentProduct(false);
    }
    if (location.pathname === "/admin/customers") {
      setCustomer(true);
      setVendors(false);
      setAdmProdList(false);
      setVendorProfile(false);
      setProduct(false);
      setCurrentProduct(false);
    }

    if (/^\/admin\/vendors\/product\/\d+$/.test(location.pathname)) {
      setCustomer(false);
      setVendors(false);
      setAdmProdList(true);
      setVendorProfile(false);
      setProduct(false);
      setCurrentProduct(false);
    }
    if (/^\/admin\/vendors\/profile\/\d+$/.test(location.pathname)) {
      setCustomer(false);
      setVendors(false);
      setAdmProdList(false);
      setVendorProfile(true);
      setProduct(false);
      setCurrentProduct(false);
    }
    if (location.pathname === "/admin/product") {
      setCustomer(false);
      setVendors(false);
      setAdmProdList(false);
      setVendorProfile(false);
      setProduct(true);
      setCurrentProduct(false);
    }
    if (/^\/admin\/product\/\d+$/.test(location.pathname)) {
      setCustomer(false);
      setVendors(false);
      setAdmProdList(false);
      setVendorProfile(false);
      setProduct(false);
      setCurrentProduct(true);
    }
  }, [location]);
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
        vendors={vendors}
        setVendors={setVendors}
      />
      <div className={css.rightPannelWrap}>
        {customer && <UserList />}
        {vendors && (
          <VendorList setAdmProdList={setAdmProdList} setVendors={setVendors} />
        )}
        {admProdList && <VendorsProducts />}
        {vendorProfile && <VendorProfileOne />}
        {product && <ProductList />}
        {currentProduct && <Product />}
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(DashBoard);

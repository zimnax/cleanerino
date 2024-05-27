import logo from "./logo.svg";
import "./App.css";
import { auth } from "./function/firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import VendorReg from "./components/vendorAdmin/vendorReg/vendorReg";
import { onAuthStateChanged } from "firebase/auth";
import DashBoard from "./components/vendorAdmin/dashboard/mainDashboard/dashBoard";
import VendorPage from "./components/vendorPage/vendorPage";
import SignIn from "./components/signIn/signIn";
import SignUp from "./components/signUp/signUp";
import EmailSend from "./components/password/emailSend";
import Product from "./components/product/product";
import Cart from "./components/cart/cart";
import Catalog from "./components/catalog/catalog";
import Main from "./components/main/main";
import VendorPageNew from "./components/vendorPageNew/vendorPageNew";
import Privacy from "./components/privacyP/privacy";
import Contact from "./components/contact/contact";
import About from "./components/about/about";
import Cabinet from "./components/userCabinet/cabinet";
import { loadCartItems } from "./function/cartSlice";
import { useDispatch } from "react-redux";
import Checkout from "./components/chekout/checkout";
import Admin from "./components/admin/admin";

function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [cartCounterC, setCartCounterC] = useState(0);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      console.log("authUser", authUser);
      if (authUser) {
        const email = authUser.email;

        setActiveUser(authUser);
      } else {
        // Користувач вийшов, робіть необхідні дії

        setActiveUser("");
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // useEffect(() => {
  //   // Перевіряємо наявність даних у localStorage при завантаженні додатку
  //   const storedCartItems = localStorage.getItem("cart");
  //   if (storedCartItems) {
  //     const cartItems = JSON.parse(storedCartItems);
  //     // Завантажуємо дані корзини у Redux store
  //     dispatch(loadCartItems(cartItems));
  //   }
  // }, [dispatch]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Отримуємо корзину з localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);

      // Рахуємо загальну кількість товарів у корзині
      const quantity = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setTotalQuantity(quantity);

      // Диспетчеризуємо екшен для завантаження товарів у корзину в Redux store
    }
  }, [cartCounterC]);
  return (
    <>
      <Routes>
        <Route
          path="/vendorRegistration"
          element={<VendorReg activeUser={activeUser} />}
        />
        <Route
          path="/signup"
          element={
            <SignIn activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/signin"
          element={
            <SignUp activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/reset"
          element={
            <EmailSend activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/vendor/dashboard"
          element={<DashBoard activeUser={activeUser} />}
        />
        <Route
          path="/user/cabinet"
          element={
            <Cabinet activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/shop"
          element={
            <Catalog
              activeUser={activeUser}
              totalQuantity={totalQuantity}
              setCartCounterC={setCartCounterC}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              setCartCounterC={setCartCounterC}
              activeUser={activeUser}
              quor={totalQuantity}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              setCartCounterC={setCartCounterC}
              activeUser={activeUser}
              quor={totalQuantity}
            />
          }
        />
        <Route
          path="/privacy"
          element={
            <Privacy activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/privacy/:id"
          element={
            <Privacy activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/about"
          element={
            <About activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/"
          element={
            <Main activeUser={activeUser} totalQuantity={totalQuantity} />
          }
        />
        <Route
          path="/vendor/page/:id"
          element={<VendorPageNew activeUser={activeUser} />}
        />
        <Route
          path="/product/:id"
          element={
            <Product
              activeUser={activeUser}
              setCartCounterC={setCartCounterC}
              totalQuantity={totalQuantity}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;

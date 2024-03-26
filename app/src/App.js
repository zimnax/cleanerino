import logo from "./logo.svg";
import "./App.css";
import { auth } from "./function/firebase";
import axios from "axios";
import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
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

function App() {
  const [activeUser, setActiveUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
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
  return (
    <>
      <Routes>
        <Route
          path="/vendorRegistration"
          element={<VendorReg activeUser={activeUser} />}
        />
        <Route path="/signup" element={<SignIn activeUser={activeUser} />} />
        <Route path="/signin" element={<SignUp activeUser={activeUser} />} />
        <Route path="/reset" element={<EmailSend activeUser={activeUser} />} />
        <Route
          path="/vendor/dashboard"
          element={<DashBoard activeUser={activeUser} />}
        />
        <Route path="/catalog" element={<Catalog activeUser={activeUser} />} />
        <Route path="/cart" element={<Cart activeUser={activeUser} />} />
        <Route path="/" element={<Main activeUser={activeUser} />} />
        <Route
          path="/vendor/page/:id"
          element={<VendorPage activeUser={activeUser} />}
        />
        <Route
          path="/product/:id"
          element={<Product activeUser={activeUser} />}
        />
      </Routes>
    </>
  );
}

export default App;

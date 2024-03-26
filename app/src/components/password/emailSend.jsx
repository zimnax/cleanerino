import { Link } from "react-router-dom";
import css from "./emailSend.module.css";

import Header from "../standartComponent/header";

import logP from "../../img/Login.png";
import { ReactSVG } from "react-svg";
import logo from "../../svg/logo-inline.svg";

import arrow from "../../svg/arrowLetBut.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";
import { auth } from "../../function/firebase";
import { useEffect, useState } from "react";
import PopUpNext from "./popUpNext";
const EmailSend = () => {
  const [emailError, setEmailError] = useState("");

  const [email, setEmail] = useState("");

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const [openPop, setOpenPop] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(String(email).toLowerCase());
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };

  useEffect(() => {
    if (!validateEmail(email)) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, emailError]);
  const signUp = async (e) => {
    e.preventDefault();
    if (emailError) {
      return;
    }
    try {
      const res = await sendPasswordResetEmail(auth, email);
      setOpenPop(true);
    } catch (error) {}
  };
  return (
    <>
      <Header />
      <div className={css.wrapAllForg}>
        <div className={css.wrapLogForm}>
          <form className={css.form}>
            <ReactSVG src={logo} />
            <div className={css.welcomeW}>
              <p className={css.stForLogBig}>Forgot Password</p>
            </div>
            <div className={css.wrapInpursForm}>
              <div className={css.wrapOneInp}>
                <p className={emailError ? css.stForLogNot : css.stForLog}>
                  Email Address
                </p>
                <input
                  className={emailError ? css.inputLogNon : css.inputLog}
                  placeholder="Placeholder"
                  onChange={emailChange}
                  value={email}
                  onBlur={() => setEmailError(validateEmail(email))}
                />
                <p className={css.helpText}>This is a helper text</p>
              </div>
            </div>
            <div className={css.wralAllRedEx}>
              <button
                className={css.buttonWrGren}
                disabled={buttonDisabled}
                onClick={signUp}
              >
                Send Link
              </button>
              <Link to="/signin" className={css.forgotPassword}>
                <p className={css.forgotPassword}>Back to Login</p>
              </Link>
            </div>
          </form>
        </div>
        {openPop && <PopUpNext setOpenPop={setOpenPop} />}
      </div>
    </>
  );
};
export default EmailSend;

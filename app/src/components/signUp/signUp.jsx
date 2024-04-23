import Header from "../standartComponent/header";
import css from "./singnUp.module.css";
import logP from "../../img/Login.png";
import { ReactSVG } from "react-svg";
import logo from "../../svg/logo-inline.svg";
import { Link } from "react-router-dom";
import arrow from "../../svg/arrowLetBut.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { auth, googleAuthProvider } from "../../function/firebase";
import { useEffect, useState } from "react";
import PopUpNext from "./popUpNext";
import HeaderModernWhite from "../standartComponent/headerModernWhite";

const SignUp = ({ activeUser, totalQuantity }) => {
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [validP, setValidP] = useState(true);

  const [openPop, setOpenPop] = useState(false);

  const validatePassword = (password) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(String(email).toLowerCase());
  };
  const validateInputLength = (input, min) => {
    return input.length >= min;
  };

  const emailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const changePass = (e) => {
    setPassword(e.target.value);
    setValidP(validatePassword(e.target.value));
  };

  useEffect(() => {
    if (
      !validateEmail(email) && // Перевірка на валідну електронну адресу
      validatePassword(password)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, emailError]);
  const signUp = async (e) => {
    e.preventDefault();
    if (!validP || emailError) {
      return;
    }
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setOpenPop(true);
    } catch (error) {
      console.log("error.code", error.code);
      let errorMessage =
        "An error occurred during sign in. Please try again later.";
      if (error.code === "auth/invalid-credential") {
        errorMessage =
          "The password is invalid. Please enter a valid password.";
      }
      if (error.code === "auth/user-not-found") {
        errorMessage =
          "There is no user record corresponding to this email. Please sign up.";
      }
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: errorMessage,
        confirmButtonColor: "#609966",
      });
    }
  };

  return (
    <>
      <HeaderModernWhite totalQuantity={totalQuantity} />

      <div className={css.wrapSignIn}>
        <div className={css.wrapLogForm}>
          <form className={css.form}>
            <ReactSVG src={logo} />
            <div className={css.welcomeW}>
              <p className={css.stForLog}>Welcome!</p>
              <p className={css.stForLogBig}>Sign in</p>
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
              <div className={css.wrapOneInp}>
                <p className={validP ? css.stForLog : css.stForLogNot}>
                  Password
                </p>
                <div className={css.passwordWrap}>
                  {showPassword ? (
                    <FaRegEye
                      className={css.eye}
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className={css.eye}
                      onClick={togglePasswordVisibility}
                    />
                  )}
                  <input
                    className={validP ? css.inputLog : css.inputLogNon}
                    placeholder="Placeholder"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={changePass}
                  />
                </div>
                <p className={css.helpText}>This is a helper text</p>
              </div>
            </div>
            <div className={css.wralAllRedEx}>
              <button
                className={css.buttonWrGren}
                disabled={buttonDisabled}
                onClick={signUp}
              >
                <div className={css.wrapSvD}>
                  <ReactSVG
                    src={arrow}
                    wrapper="div"
                    style={{ width: "20px", height: "25px" }}
                  />
                </div>
                Login
              </button>
              <Link to="/reset" className={css.forgotPassword}>
                <p className={css.forgotPassword}>Forgot Password?</p>
              </Link>
            </div>
            <div className={css.wralAllRedEx}>
              <p className={css.textPallRe}>
                Don’t have an account?&nbsp;
                <Link className={css.signInTo} to="/signup">
                  &nbsp;
                  <span className={css.signInTo}>Sign Up</span>
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className={css.wrapIcon}>
          <img src={logP} className={css.logPic} alt="log" />
        </div>
        {openPop && <PopUpNext setOpenPop={setOpenPop} />}
      </div>
    </>
  );
};
export default SignUp;

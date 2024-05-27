import Header from "../standartComponent/header";
import css from "./singnIn.module.css";
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
import passwordValidator from "password-validator";

import HeaderModernWhite from "../standartComponent/headerModernWhite";
const SignIn = ({ activeUser, totalQuantity }) => {
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRep, setShowPasswordRep] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [validP, setValidP] = useState(true);
  const [validPSec, setValidPSec] = useState(true);
  const [openPop, setOpenPop] = useState(false);
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Мінімум 8 символів
    .has()
    .uppercase() // Має містити принаймні одну велику літеру
    .has()
    .lowercase() // Має містити принаймні одну маленьку літеру
    .has()
    .digits() // Має містити принаймні одну цифру
    .has()
    .not()
    .spaces() // Не має містити пробіли
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]);
  // const validatePassword = (password) => {
  //   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  //   return re.test(password);
  // };
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(String(email).toLowerCase());
  };
  const validateInputLength = (input, min) => {
    return input.length >= min;
  };
  const validateNameInput = (name) => {
    setNameError(!validateInputLength(name, 2) ? false : true);
  };
  const nameChange = (e) => {
    setName(e.target.value);
    validateNameInput(e.target.value);
  };
  const emailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRepVisibility = () => {
    setShowPasswordRep(!showPasswordRep);
  };
  const changePass = (e) => {
    setPassword(e.target.value);
    setValidP(schema.validate(e.target.value));
  };
  const changePassSecond = (e) => {
    let valid = password === e.target.value;
    setPasswordRep(e.target.value);
    setValidPSec(valid);
  };
  // useEffect(() => {
  //   if (
  //     validateInputLength(name, 2) &&
  //     !validateEmail(email) && // Перевірка на валідну електронну адресу
  //     schema.validate(password) && // Перевірка на валідний пароль
  //     password === passwordRep
  //   ) {
  //     setButtonDisabled(false);
  //   } else {
  //     setButtonDisabled(true);
  //   }
  // }, [name, email, password, passwordRep, emailError, nameError]);
  const signUp = async (e) => {
    e.preventDefault();
    // if (!validP || !validPSec || emailError || !nameError) {
    //   return;
    // }

    if (
      !validP ||
      !validPSec ||
      emailError ||
      !nameError ||
      passwordRep === ""
    ) {
      let errorMessage = "";
      if (!nameError) {
        errorMessage += "Please enter a valid name.\n";
      }
      if (emailError) {
        errorMessage += "Please enter a valid email address.\n";
      }
      if (password === "") {
        errorMessage += "Please enter a password.\n";
      } else if (!validP) {
        errorMessage +=
          "Password is invalid. Please fix the following issues:\n";
        if (!schema.has().min(8).validate(password)) {
          errorMessage += "- Password must be at least 8 characters long.\n";
        }
        if (!schema.has().uppercase().validate(password)) {
          errorMessage +=
            "- Password must contain at least one uppercase letter.\n";
        }
        if (!schema.has().lowercase().validate(password)) {
          errorMessage +=
            "- Password must contain at least one lowercase letter.\n";
        }
        if (!schema.has().digits().validate(password)) {
          errorMessage += "- Password must contain at least one digit.\n";
        }
        if (!schema.has().not().spaces().validate(password)) {
          errorMessage += "- Password cannot contain spaces.\n";
        }
        if (schema.is().oneOf(["Passw0rd", "Password123"]).validate(password)) {
          errorMessage +=
            "- Password is too common. Please choose a stronger password.";
        }
      }

      if (password !== passwordRep) {
        errorMessage += "Passwords do not match.\n";
      }
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: errorMessage,
        confirmButtonColor: "#609966",
        timer: 2000, // 2000 мілісекунд (2 секунди)
        showConfirmButton: false,
      });
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      handleSubmit(res.user.email, res.user.uid);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This email address is already in use!",
          confirmButtonColor: "#609966",
        });
      } else if (error.code === "auth/weak-password") {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "The password is too weak. Please choose a stronger password.",
          confirmButtonColor: "#609966",
        });
      } else if (error.code === "auth/invalid-email") {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Invalid email address. Please enter a valid email address.",
          confirmButtonColor: "#609966",
        });
      } else if (error.code === "auth/operation-not-allowed") {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Email/password accounts are not enabled. Please contact support.",
          confirmButtonColor: "#609966",
        });
      } else if (error.code === "auth/network-request-failed") {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "Network request failed. Please check your internet connection and try again.",
          confirmButtonColor: "#609966",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: "An error occurred during registration. Please try again later.",
          confirmButtonColor: "#609966",
        });
      }
    }
  };
  const handleSubmit = (mail, uid) => {
    let id = uid ? uid : "";

    // Відправка запиту на сервер для створення нового користувача
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/users/profile`, {
        user_name: name,
        email: mail,
        firebaseId: id,
      })
      .then((response) => {
        // Обробка успішної відповіді від сервера (необов'язково)
        setOpenPop(true);
      })
      .catch((error) => {
        // Обробка помилки під час відправки запиту на сервер
        console.error("Error creating user:", error);
      });
  };
  return (
    <>
      <HeaderModernWhite
        activeUser={activeUser}
        totalQuantity={totalQuantity}
      />
      <div className={css.wrapSignIn}>
        <div className={css.wrapLogForm}>
          <form className={css.form}>
            <ReactSVG src={logo} />
            <div className={css.welcomeW}>
              <p className={css.stForLog}>Welcome!</p>
              <p className={css.stForLogBig}>Sign up</p>
            </div>
            <div className={css.wrapInpursForm}>
              <div className={css.wrapOneInp}>
                <p className={!nameError ? css.stForLogNot : css.stForLog}>
                  Full Name
                </p>
                <input
                  className={!nameError ? css.inputLogNon : css.inputLog}
                  placeholder="Placeholder"
                  value={name}
                  onChange={nameChange}
                  onBlur={() => validateNameInput(name)}
                />
                {/* <p className={css.helpText}>This is a helper text</p> */}
              </div>
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
                {/* <p className={css.helpText}>This is a helper text</p> */}
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
                {/* <p className={css.helpText}>This is a helper text</p> */}
              </div>
              <div className={css.wrapOneInp}>
                <p className={validPSec ? css.stForLog : css.stForLogNot}>
                  Confirm Password
                </p>
                <div className={css.passwordWrap}>
                  {showPasswordRep ? (
                    <FaRegEye
                      className={css.eye}
                      onClick={togglePasswordRepVisibility}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className={css.eye}
                      onClick={togglePasswordRepVisibility}
                    />
                  )}
                  <input
                    className={validPSec ? css.inputLog : css.inputLogNon}
                    placeholder="Placeholder"
                    value={passwordRep}
                    type={showPasswordRep ? "text" : "password"}
                    onChange={changePassSecond}
                  />
                </div>
                {/* <p className={css.helpText}>This is a helper text</p> */}
              </div>
            </div>
            <div className={css.wralAllRedEx}>
              <div className={css.vendorLinkReg}>
                <p className={css.textPallRe}>
                  Already have an account?&nbsp;
                  <Link className={css.signInTo} to="/signin">
                    &nbsp;
                    <span className={css.signInTo}>Sign In</span>
                  </Link>
                </p>
                <p className={css.textPallRe}>
                  Do you want to sell with us?&nbsp;
                  <Link className={css.signInTo} to="/vendorRegistration">
                    &nbsp;
                    <span className={css.signInTo}>Register as a vendor</span>
                  </Link>
                </p>
              </div>
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
                Sign Up
              </button>
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
export default SignIn;

import Header from "../standartComponent/header";
import css from "./singnUp.module.css";
import logP from "../../img/Login.png";
import { ReactSVG } from "react-svg";
import logo from "../../svg/logo-inline.svg";
import { Link } from "react-router-dom";
import arrow from "../../svg/arrowLetBut.svg";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Swal from "sweetalert2";
import google from "../../img/Google-Symbol.png";
import passwordValidator from "password-validator";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  deleteUser,
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
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
  };
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
    setValidP(schema.validate(e.target.value));
  };

  useEffect(() => {
    if (
      !validateEmail(email) && // Перевірка на валідну електронну адресу
      schema.validate(password)
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [email, password, emailError]);
  const signUp = async (e) => {
    e.preventDefault();
    if (!validP || emailError) {
      let errorMessage = "";
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
      const res = await signInWithEmailAndPassword(auth, email, password);
      setOpenPop(true);
    } catch (error) {
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
  // const signInWithGoogle = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const tempResult = await signInWithPopup(auth, googleAuthProvider);
  //     const tempUser = tempResult.user;
  //     console.log("tempUser", tempUser);

  //     const response = await axios.get(
  //       `${process.env.REACT_APP_API_URL}/api/v1/vendor/firebaseId/${tempUser.uid}`
  //     );
  //     console.log("response", response);
  //     if (response.status === 404) {
  //       // Якщо користувача не знайдено в обох таблицях, видаляємо створений обліковий запис
  //       await deleteUser(tempUser);
  //       Swal.fire({
  //         icon: "error",
  //         title: "User Not Registered",
  //         text: "There is no user record corresponding to this email. Please sign up.",
  //         confirmButtonColor: "#609966",
  //       });
  //     } else if (response.status === 200) {
  //       // Якщо користувач знайдений, виконуємо вхід

  //       setOpenPop(true);
  //       // Swal.fire({
  //       //   icon: "success",
  //       //   title: "Sign In Successful",
  //       //   text: "You have successfully signed in.",
  //       //   confirmButtonColor: "#609966",
  //       // });
  //     } else {
  //       throw new Error("Unknown error during sign in process.");
  //     }
  //   } catch (error) {
  //     console.log("error.code", error.code);
  //     let errorMessage =
  //       "An error occurred during sign in with Google. Please try again later.";
  //     Swal.fire({
  //       icon: "error",
  //       title: "Google Sign In Failed",
  //       text: errorMessage,
  //       confirmButtonColor: "#609966",
  //     });
  //   }
  // };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    let tempResult, tempUser;

    try {
      tempResult = await signInWithPopup(auth, googleAuthProvider);
      tempUser = tempResult.user;

      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/firebaseId/${tempUser.uid}`
      );

      if (response.data.found === false) {
        // Якщо користувача не знайдено в обох таблицях, видаляємо створений обліковий запис
        await deleteUser(tempUser);
        Swal.fire({
          icon: "error",
          title: "User Not Registered",
          text: "There is no user record corresponding to this email. Please sign up.",
          confirmButtonColor: "#609966",
        });
      } else if (response.status === 200) {
        // Якщо користувач знайдений, виконуємо вхід

        setOpenPop(true);
        // Swal.fire({
        //   icon: "success",
        //   title: "Sign In Successful",
        //   text: "You have successfully signed in.",
        //   confirmButtonColor: "#609966",
        // });
      } else {
        throw new Error("Unknown error during sign in process.");
      }
    } catch (error) {
      console.log("error.code", error.code);
      let errorMessage =
        "An error occurred during sign in with Google. Please try again later.";

      Swal.fire({
        icon: "error",
        title: "Google Sign In Failed",
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
              </div>
            </div>
            <div className={css.wralAllRedEx}>
              <button className={css.buttonWrGren} onClick={signUp}>
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
            <button onClick={signInWithGoogle} className={css.buttonFormGoogle}>
              <img src={google} className={css.googleIcon} />
              Login with Google
            </button>
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

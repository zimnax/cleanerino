import css from "./vendorReg.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../../svg/logo-inline.svg";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import google from "../../../img/Google-Symbol.png";
import Swal from "sweetalert2";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

import axios from "axios";
import { auth, googleAuthProvider } from "../../../function/firebase";
import PopUpMessage from "./addProdComponents/popUpMessage";
import { Link, useNavigate } from "react-router-dom";
import passwordValidator from "password-validator";

const VendorRegPage = ({ setReg, setBrandPage, activeUser }) => {
  const schema = new passwordValidator();
  schema
    .is()
    .min(8) // Мінімальна довжина 8 символів
    .is()
    .max(100) // Максимальна довжина 100 символів
    .has()
    .uppercase() // Має містити великі літери
    .has()
    .lowercase() // Має містити малі літери
    .has()
    .digits(2) // Має містити принаймні 2 цифри
    .has()
    .not()
    .spaces() // Не повинен містити пробіли
    .is()
    .not()
    .oneOf(["Passw0rd", "Password123"]); // Чорний список слів
  const [name, setName] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [brand, setBrand] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRep, setPasswordRep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRep, setShowPasswordRep] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [lastError, setLastError] = useState("");
  const [brandError, setBrandError] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [validP, setValidP] = useState(true);
  const [validPSec, setValidPSec] = useState(true);
  const [popUpMes, setPopUpMes] = useState(false);
  const [popUpMesSu, setPopUpMesSu] = useState(false);
  const navigate = useNavigate();
  const signOutUser = () => {
    signOut(auth)
      .then(() => {})
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    if (activeUser) {
      signOutUser();
    }
  }, []);
  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    return re.test(password);
  };

  const validateInputLength = (input, min) => {
    if (input === null || input === undefined) {
      return false;
    } else {
      return input.length >= min;
    }
  };

  const validateNameInput = (name) => {
    setNameError(
      !validateInputLength(name, 2)
        ? "Name must be at least 2 characters long"
        : ""
    );
  };

  const validateLastInput = (last) => {
    setLastError(
      !validateInputLength(last, 2)
        ? "Last name must be at least 2 characters long"
        : ""
    );
  };

  const validateBrandInput = (brand) => {
    setBrandError(
      !validateInputLength(brand, 2)
        ? "Brand name must be at least 2 characters long"
        : ""
    );
  };

  useEffect(() => {
    if (
      validateInputLength(name, 2) &&
      validateInputLength(last, 2) &&
      validateInputLength(brand, 2) &&
      !validateEmail(email) && // Перевірка на валідну електронну адресу
      schema.validate(password) && // Перевірка на валідний пароль
      password === passwordRep
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    name,
    last,
    email,
    brand,
    password,
    passwordRep,
    passwordError,
    emailError,
    nameError,
    lastError,
    brandError,
  ]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordRepVisibility = () => {
    setShowPasswordRep(!showPasswordRep);
  };

  const signUp = async (e) => {
    e.preventDefault();
    if (passwordError || emailError || nameError || lastError || brandError) {
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
      //setPopUpMes(true);
    }
  };

  const handleContinueClick = (e) => {
    e.preventDefault();

    validateNameInput(name);
    validateLastInput(last);
    validateBrandInput(brand);
  };

  const handleSubmit = (mail, uid) => {
    let id = uid ? uid : "";

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`, {
        firstName: name,
        lastName: last,
        email: mail,
        brandName: brand,
        roleName: "vendor",
        firebaseId: id,
        photo: null,
      })
      .then((response) => {
        setPopUpMesSu(true);
        if (popUpMesSu === false) {
          setReg(false);
          setBrandPage(true);
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  const handleSubmitGoogle = (mail, uid, displayName) => {
    let id = uid ? uid : "";

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`, {
        firstName: displayName,
        lastName: last,
        email: mail,
        brandName: brand,
        roleName: "vendor",
        firebaseId: id,
        photo: null,
      })
      .then((response) => {
        setPopUpMesSu(true);
        if (popUpMesSu === false) {
          setReg(false);
          setBrandPage(true);
        }
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };
  const signInWithGoogle = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        handleSubmitGoogle(
          result.user.email,
          result.user.uid,
          result.user.displayName
        );
        // handleSubmit(result.user.email, result.user.uid);
      })
      .catch((error) => {
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
      });
  };
  const skip = () => {
    setReg(false);
    setBrandPage(true);
  };
  const changePass = (e) => {
    setPassword(e.target.value);
    setValidP(schema.validate(e.target.value));
  };
  const validatePasswords = () => {
    const isValid = schema.validate(password);
    const isValidRep = schema.validate(passwordRep);
    if (!isValid) {
      setPasswordError(
        "Invalid password format. The password must contain at least 8 characters, minimum of 2 digits, uppercase and lowercase letters, as well as one special character."
      );
    } else if (!isValidRep) {
      setPasswordError("Invalid repeated password format");
    } else if (password !== passwordRep) {
      setPasswordError("Passwords do not match");
    } else {
      setPasswordError("");
    }
  };
  useEffect(() => {
    validatePasswords();
  }, [password, passwordRep]);

  const changePassSecond = (e) => {
    let valid = password === e.target.value;
    setPasswordRep(e.target.value);
    setValidPSec(valid);
  };

  return (
    <>
      <div className={css.regWrap}>
        <div className={css.headerWrap}>
          <Link to="/">
            <ReactSVG src={logo} />
          </Link>
        </div>
        <div className={css.titleWrap}>
          <p className={css.titleReg}>Let's set up your workspace</p>
          <p className={css.titleDesc}>
            Create a free vendor account to start selling on Cleanerino.
          </p>
          <div className={css.lineWrap}>
            <div className={css.lineGreen}></div>
            <div className={css.lineGrey}></div>
            <div className={css.lineGrey}></div>
          </div>
        </div>
        <div className={css.formWrap}>
          <div className={css.twoInputWr}>
            <div className={css.inputWrap}>
              <label className={nameError ? css.labelInpNot : css.labelInp}>
                First name
              </label>
              <input
                className={nameError ? css.regInputNot : css.regInput}
                // placeholder="Placeholder"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateNameInput(name)}
              />
            </div>
            <div className={css.inputWrap}>
              <label className={lastError ? css.labelInpNot : css.labelInp}>
                Last name
              </label>
              <input
                className={lastError ? css.regInputNot : css.regInput}
                // placeholder="Placeholder"
                value={last}
                onChange={(e) => setLast(e.target.value)}
                onBlur={() => validateLastInput(last)}
              />
            </div>
          </div>
          <div className={css.twoInputWr}>
            <div className={css.inputWrap}>
              <label className={emailError ? css.labelInpNot : css.labelInp}>
                Email
              </label>
              <input
                className={emailError ? css.regInputNot : css.regInput}
                // placeholder="Placeholder"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailError(validateEmail(email))}
              />
            </div>
            <div className={css.inputWrap}>
              <label className={brandError ? css.labelInpNot : css.labelInp}>
                Brand name
              </label>
              <input
                className={brandError ? css.regInputNot : css.regInput}
                // placeholder="Placeholder"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                onBlur={() => validateBrandInput(brand)}
              />
            </div>
          </div>
          <div className={css.twoInputWr}>
            <div className={css.inputWrap}>
              <label className={validP ? css.labelInp : css.labelInpNot}>
                Password
              </label>
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
                  className={validP ? css.regInputP : css.regInputNot}
                  // placeholder="Placeholder"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  onChange={changePass}
                />
              </div>
            </div>
            <div className={css.inputWrap}>
              <label
                id="repId"
                className={validPSec ? css.labelInp : css.labelInpNot}
              >
                Repeat password
              </label>
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
                  id="pasId"
                  className={validPSec ? css.regInputP : css.regInputNot}
                  // placeholder="Placeholder"
                  value={passwordRep}
                  type={showPasswordRep ? "text" : "password"}
                  onChange={changePassSecond}
                />
              </div>
            </div>
          </div>
        </div>
        {passwordError && (
          <p className={css.pasError}>{password.length > 0 && passwordError}</p>
        )}
        <button
          onClick={signUp}
          className={css.buttonForm}
          disabled={buttonDisabled}
        >
          Continue
        </button>
        <button onClick={signInWithGoogle} className={css.buttonFormGoogle}>
          <img src={google} className={css.googleIcon} />
          Register with Google
        </button>
        {popUpMes && (
          <PopUpMessage
            text={"The user with this email is registered"}
            setPopUpMes={setPopUpMes}
          />
        )}
        {popUpMesSu && (
          <PopUpMessage
            text={"User successfully created"}
            setPopUpMes={setPopUpMesSu}
          />
        )}
      </div>
    </>
  );
};

export default VendorRegPage;

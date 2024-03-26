import css from "./vendorReg.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../../svg/logo-inline.svg";
import upload from "../../../svg/upload.svg";
import logoRec from "../../../img/Rectangle4.png";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { Circles } from "react-loader-spinner";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
import arrow from "../../../svg/chevron.svg";
import BrandDet from "./brandComponent/brandDet";
import PayoutDet from "./brandComponent/payoutDet";
import withMySQLData from "../../HOK/withMySQLData";
const AddBrandDetails = ({
  data,
  setBrandPage,
  setAddProdPage,
  activeUser,
}) => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [brandDesc, setBrandDesc] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedTwo, setIsCheckedTwo] = useState(false);
  const [baner, setBaner] = useState(null);
  const [brandId, setBrandIs] = useState(null);
  const [payaut, setPayaut] = useState(null);
  const [stateList, setStateList] = useState(null);
  const [logoT, setLogoT] = useState(null);
  const fileInputRef = useRef(null);
  const [street, setStreet] = useState("");
  const fileInputRefLogo = useRef(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [cityList, setCityList] = useState(null);
  const [misto, setMisto] = useState("");
  const [zip, setZip] = useState("");
  const [cityFotrBase, setCityFotrBase] = useState("");
  const [users, setUsers] = useState([]);
  const [brandError, setBrandError] = useState(true);
  const [streetError, setStreetError] = useState(true);
  const [zipError, setZipError] = useState(true);
  const [myBrandError, setMyBrandError] = useState(true);
  const [countryError, setCountryError] = useState(true);
  const [stateError, setStateError] = useState(true);
  const [cityError, setCityError] = useState(true);
  const [loading, setLoading] = useState(false);
  ///////
  const [countryId, setCountryId] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [theId, setTheId] = useState(null);

  useEffect(() => {
    if (users) {
      setBrandDesc(users.brand_description);
      setBrandIs(users.my_brand_name);
      setPayaut(users.payout_name);
      setCityFotrBase(users.state);
      setMisto(users.city);
      setStreet(users.street);
      setZip(users.zip_code);
      setIsChecked(() => {
        if (users.returns === "false") {
          return false;
        } else if (users.returns === "true") {
          return true;
        }
      });
      setIsCheckedTwo(() => {
        if (users && users.refunds === "false") {
          return false;
        } else if (users && users.refunds === "true") {
          return true;
        }
      });
    }
  }, [users]);

  useEffect(() => {
    GetCountries().then((result) => {
      setCountryList(result);
    });
  }, []);

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    setBaner(event.target.files[0]);
    // Додайте вашу логіку для завантаження файлу тут
  };
  const handleLogoClickLogo = () => {
    fileInputRefLogo.current.click();
  };

  const handleFileChangeLogo = (event) => {
    setLogoT(event.target.files[0]);

    // Додайте вашу логіку для завантаження файлу тут
  };
  //////////////////////////

  useEffect(() => {
    // Пошук об'єкта, де firebase_id === activeUser.uid
    const found = data.find((item) => item.firebase_id === activeUser.uid);

    // Оновлення стану знайденого об'єкта
    setUsers(found);
  }, [data, activeUser]);
  /////////////////

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };
  const skip = () => {
    setBrandPage(false);
    setAddProdPage(true);
  };

  const sendDataToServer = async (event) => {
    event.preventDefault(); // Щоб уникнути перезавантаження сторінки
    let isBrandError = validateInputLength(brandDesc, 2);
    let isMyBrandError = brandId !== null;
    let isStreetError = validateInputLength(street, 2);
    let isZipError = validateInputLength(zip, 2);
    let isCountryError = theId !== null;
    let isStateError = stateId !== null;
    let isCityError = cityId !== null;

    setBrandError(isBrandError);
    setMyBrandError(isMyBrandError);
    setStreetError(isStreetError);
    setZipError(isZipError);
    setCountryError(isCountryError);
    setStateError(isStateError);
    setCityError(isCityError);

    if (
      !isBrandError ||
      !isMyBrandError ||
      !isStreetError ||
      !isZipError ||
      !isCountryError ||
      !isStateError ||
      !isCityError
    ) {
      return; // Якщо хоча б одна з умов не виконується, вийти з функції
    }
    setLoading(true);
    const form = event.target;
    const data = new FormData();
    const formDataObj = Object.fromEntries(data.entries());

    formDataObj.brand_description = brandDesc;
    formDataObj.my_brand_id = brandId;
    formDataObj.payout_details_id = payaut;
    formDataObj.country = theId;
    formDataObj.state = stateId;
    formDataObj.city = cityId;
    formDataObj.street = street;
    formDataObj.zip_code = zip;
    formDataObj.returns = isChecked ? "true" : "false";

    try {
      let url;
      if (logoT) {
        // Відправка файлу на сервер
        const fileFormData = new FormData();
        fileFormData.append("file", logoT);

        const fileResponse = await axios.put(
          `http://88.218.188.44:4000/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
          fileFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Отримання URL завантаженого файлу
        url = fileResponse.data.url;
      }
      if (baner) {
        // Відправка файлу на сервер
        const fileFormDataT = new FormData();
        fileFormDataT.append("fileT", baner);

        const fileResponse = await axios.put(
          `http://88.218.188.44:4000/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
          fileFormDataT,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Отримання URL завантаженого файлу
        url = fileResponse.data.url;
      }
      const response = await axios.put(
        `http://88.218.188.44:4000/api/v1/vendor/profile/${users.id}`, // Потрібно замінити userId на відповідний id користувача
        formDataObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        setLoading(false);
        skip();
      }
      // Додайте тут логіку для обробки успішної відправки даних
    } catch (error) {
      console.error("Error sending data:", error);

      // Додайте тут логіку для обробки помилки відправки даних
    }
  };
  const validateInputLength = (input, min) => {
    if (input === null || input === undefined) {
      return false;
    } else {
      return input.length >= min;
    }
  };
  const validateBrandInput = (name) => {
    setBrandError(!validateInputLength(name, 2) ? false : true);
  };
  const validateStreetInput = (name) => {
    setStreetError(!validateInputLength(name, 2) ? false : true);
  };
  const validateZipInput = (name) => {
    setZipError(!validateInputLength(name, 2) ? false : true);
  };
  useEffect(() => {
    if (brandError) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [brandError]);
  const changeBrand = (e) => {
    const value = e.target.value;
    setBrandDesc(value);
    if (value !== null) {
      validateBrandInput(value);
    }
  };
  const changeStreet = (e) => {
    setStreet(e.target.value);

    validateStreetInput(e.target.value);
  };
  const changeZip = (e) => {
    setZip(e.target.value);

    validateZipInput(e.target.value);
  };
  return (
    <>
      <div className={css.regWrap}>
        <div className={css.headerWrap}>
          <ReactSVG src={logo} />
          <button onClick={skip} className={css.buttonSkip}>
            Skip
          </button>
        </div>
        <div className={css.titleWrap}>
          <p className={css.titleReg}>
            Share your brand story to be discovered
          </p>
          <p className={css.titleDesc}>
            You can make changes to your brand in vendor your dashboard at any
            time.
          </p>
          <div className={css.lineWrap}>
            <div className={css.lineGreen}></div>
            <div className={css.lineGreen}></div>
            <div className={css.lineGrey}></div>
          </div>
        </div>
        <form className={css.formForBrandDetWr} onSubmit={sendDataToServer}>
          <div className={css.firtBlockWr}>
            <div className={css.logoWrap}>
              <label className={css.labelInp}>Logo</label>
              <div className={css.wrapLogoDrop} onClick={handleLogoClickLogo}>
                {logoT ? (
                  <img
                    src={URL.createObjectURL(logoT)}
                    className={css.photoLogo}
                    alt="logo"
                  />
                ) : (
                  <img src={logoRec} className={css.photoLogo} alt="logo" />
                )}
                <div className={css.dropDownWrap}>
                  <ReactSVG src={upload} />
                  <p className={css.descPDrop}>
                    <span className={css.descPDropSpan}>
                      Click to upload logo
                    </span>
                    *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
                    <span className={css.descSpanSize}>280х432px.</span>
                  </p>
                </div>
              </div>
              <input
                type="file"
                id="logoUploadLogo"
                name="logo"
                ref={fileInputRefLogo}
                accept=".svg,.png,.jpeg,.jpg,.gif"
                onChange={handleFileChangeLogo}
                style={{ display: "none" }}
              />
            </div>
            <div className={css.logoWrap}>
              <label className={brandError ? css.labelInp : css.labelInpNot}>
                Brand description
              </label>
              <textarea
                id="brandDesc"
                name="brand_description"
                className={brandError ? css.inpBrandDesc : css.inpBrandDescNot}
                onBlur={() => validateBrandInput(brandDesc)}
                value={brandDesc}
                onChange={changeBrand}
                placeholder="Tell customers about your brand, products, and values."
              />
            </div>
          </div>
          <div className={css.banerWrap}>
            <label className={css.labelInp}>Baner</label>

            <div
              className={css.dropDownWrapBig}
              onClick={handleLogoClick}
              style={{
                backgroundImage: baner
                  ? `url(${URL.createObjectURL(baner)})`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <ReactSVG src={upload} />
              <p className={css.descPDrop}>
                <span className={css.descPDropSpan}>Click to upload logo</span>
                *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
                <span className={css.descSpanSize}>280х432px.</span>
              </p>
            </div>
            <input
              type="file"
              id="logoUpload"
              name="banner"
              ref={fileInputRef}
              accept=".svg,.png,.jpeg,.jpg,.gif"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className={css.firtBlockWr}>
            <BrandDet
              setBrandIs={setBrandIs}
              myBrandError={myBrandError}
              setMyBrandError={setMyBrandError}
            />
            {/**  <PayoutDet setPayaut={setPayaut} />*/}
          </div>
          <div className={css.selectWrBig}>
            <label className={css.labelInp}>Address</label>
            {countryList && (
              <select
                className={
                  countryError ? css.brandSelectLong : css.brandSelectLongNot
                }
                onChange={(e) => {
                  const selectedCountry = countryList[e.target.value];
                  setCountryId(selectedCountry.name);
                  setCountryError(true);
                  setTheId(selectedCountry.id);
                  GetState(selectedCountry.id).then((result) => {
                    setStateList(result);
                  });
                }}
                value={
                  countryList.findIndex((item) => item.name === countryId) !==
                  -1
                    ? countryList.findIndex((item) => item.name === countryId)
                    : ""
                } // змінено умову вибору значення
              >
                <option disabled={!countryId} value="">
                  Select county
                </option>
                {countryList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {stateList && (
              <select
                name="state"
                className={
                  stateError ? css.brandSelectLong : css.brandSelectLongNot
                }
                onChange={(e) => {
                  const selectedState = stateList[e.target.value];
                  setStateId(selectedState.id);
                  setCityFotrBase(selectedState.name);
                  setStateError(true);
                  GetCity(theId, selectedState.id).then((result) => {
                    setCityList(result);
                  });
                }}
                value={
                  stateList.findIndex((item) => item.name === cityFotrBase) !==
                  -1
                    ? stateList.findIndex((item) => item.name === cityFotrBase)
                    : ""
                }
              >
                <option disabled={!stateId} value="">
                  Select state
                </option>
                {stateList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            {cityList && (
              <select
                className={
                  cityError ? css.brandSelectLong : css.brandSelectLongNot
                }
                name="city"
                onChange={(e) => {
                  const selectedCity = cityList[e.target.value];
                  setCityError(true);
                  setCityId(selectedCity.id);
                  setMisto(selectedCity.name);
                }}
                value={
                  cityList.findIndex((item) => item.name === misto) !== -1
                    ? cityList.findIndex((item) => item.name === misto)
                    : ""
                }
              >
                <option disabled={!cityId} value="">
                  Select a city
                </option>
                {cityList.map((item, index) => (
                  <option key={index} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
            <input
              name="street"
              placeholder="Street address"
              value={street}
              onChange={changeStreet}
              className={streetError ? css.adressIno : css.adressInoNot}
              onBlur={() => validateStreetInput(street)}
            />
            <input
              placeholder="Zipcode"
              name="zip_code"
              value={zip}
              onChange={changeZip}
              className={zipError ? css.adressIno : css.adressInoNot}
              onBlur={() => validateZipInput(zip)}
            />
            <label className={css.labelInpDown}>
              will be used for calculating shipping costs for the customer
            </label>
          </div>
          <div className={css.returnWr}>
            <div className={css.wrapChack}>
              <label className={css.labelInp}>Returns</label>
              <div className={css.chaWr}>
                <label className={css.check} onClick={handleRadioChange}>
                  <input
                    name="returns"
                    type="radio"
                    className={css.check__check}
                    checked={isChecked}
                    onChange={() => {}} // Порожня функція, щоб уникнути помилок
                  />
                  <span className={css.check__indicator}></span>
                </label>
                {!isChecked && <p className={css.of}>Off</p>}
                {isChecked && <p className={css.on}>On</p>}
              </div>
            </div>
            {isChecked && (
              <p className={css.downRetWr}>
                Customers will reach out to you directly to request a return or
                refund
              </p>
            )}
            {!isChecked && (
              <p className={css.downRetWr}>
                Customers will be notified that your store does not accept
                returns. You can change this at any time
              </p>
            )}
          </div>

          <button className={css.buttonForm} type="submit">
            Start selling
          </button>
        </form>
        {loading && (
          <div className={css.spinerWrap}>
            <Circles
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        )}
      </div>
    </>
  );
};
export default withMySQLData("http://88.218.188.44:4000/api/v1/vendor/profile")(
  AddBrandDetails
);

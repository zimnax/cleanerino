import css from "./vendorReg.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../../svg/logo-inline.svg";
import upload from "../../../svg/upload.svg";
import logoRec from "../../../img/Rectangle4.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../../svg/chevron.svg";
import LeftSide from "./addProdComponents/leftSide";
import RightSide from "./addProdComponents/rightSide";
import axios from "axios";
import PopUpNext from "./addProdComponents/popUpNext";
import withMySQLData from "../../HOK/withMySQLData";
const AddProduct = ({ setAddProdPage, data, activeUser }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [prodName, setProdName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const [glass, setGlass] = useState(null);
  const [metal, setMetal] = useState(null);
  const [paper, setPaper] = useState(null);
  const [plastic, setPlastic] = useState(null);
  const [sizes, setSizes] = useState([{ weight: 0, volume: 0, price: 0 }]);
  const [shape, setShape] = useState([{ shape: 0, price: 0 }]);
  const [scent, setScent] = useState([{ scent: 0, price: 0 }]);
  const [color, setColor] = useState([{ color: 0, price: 0 }]);
  const [productPrice, setProductPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [volume, setVolume] = useState("");
  const [quantity, setQuantity] = useState("");
  const [activeCategories, setActiveCategories] = useState([]);
  const [activeNames, setActiveNames] = useState([]);
  const [words, setWords] = useState([]); // Стан для зберігання списку слів
  const [wordsWithout, setWordsWithout] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [activeCategoriesAndNames, setActiveCategoriesAndNames] = useState({
    activeCategories: [],
    activeNames: [],
  });
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  //////////////////////////////////////////////////////////////////////////////

  const [nameError, setNameError] = useState(true);
  const [shortDescError, setShortDescError] = useState(true);
  const [longDescError, setLongDescError] = useState(true);
  const [priceError, setPriceError] = useState(true);
  const [weightError, setWeightError] = useState(true);
  const [heightError, setHeightError] = useState(true);
  const [lengthError, setLengthError] = useState(true);
  const [volumeError, setVolumeError] = useState(true);
  const [prodCatError, setProdCatError] = useState(true);
  const [prodTypeError, setProdTypeError] = useState(true);
  const [quontError, setQuontError] = useState(true);
  const [ingridientError, setIngridientError] = useState(true);
  const [ingridientWithotError, setIngridientWithotError] = useState(true);
  const [picError, setPicError] = useState(true);
  const [instruction, setInstruction] = useState("");
  const [localPickUp, setLocalPickUp] = useState(false);
  const validateInputLength = (input, min) => {
    if (input === null) {
      return false;
    } else {
      return input.length >= min;
    }
  };
  const startNewProd = () => {
    setWords([]);
    setUploadedImages([]);
    setUploadedVideos([]);
    setActiveCategories([]);
    setActiveNames([]);
    setQuantity("");
    setVolume("");
    setWeight("");
    setHeight("");
    setLength("");
    setWidth("");
    setScent([{ scent: 0, price: 0 }]);
    setShape([{ shape: 0, price: 0 }]);
    setColor([{ color: 0, price: 0 }]);
    setProductPrice("");
    setSizes([{ weight: 0, volume: 0, price: 0 }]);
    setPlastic(null);
    setPaper(null);
    setMetal(null);
    setGlass(null);
    setProdName("");
    setShortDesc("");
    setLongDesc("");
    setPopUp(false);
    setLocalPickUp(false);
    setInstruction("");
    setWordsWithout([]);
  };
  const sendFile = async (id) => {
    try {
      const formData = new FormData();

      uploadedImages.forEach((image) => {
        formData.append("uploadedImages", image);
      });

      // Додавання відео до FormData
      uploadedVideos.forEach((video) => {
        formData.append("uploadedVideos", video);
      });

      const responseF = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/file/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch {
      console.log("Error");
    }
  };
  const validateNameInput = (name) => {
    setNameError(!validateInputLength(name, 2) ? false : true);
  };
  const validateShortDescInput = (name) => {
    setShortDescError(!validateInputLength(name, 2) ? false : true);
  };
  const validateLongDescInput = (name) => {
    setLongDescError(!validateInputLength(name, 20) ? false : true);
  };
  const validatePriceInput = (name) => {
    setPriceError(!validateInputLength(name, 1) ? false : true);
  };
  const validateWeightInput = (name) => {
    setWeightError(!validateInputLength(name, 1) ? false : true);
  };
  const validateVolumeInput = (name) => {
    setVolumeError(!validateInputLength(name, 1) ? false : true);
  };
  const validateQuantityInput = (name) => {
    setQuontError(!validateInputLength(name, 1) ? false : true);
  };

  const changeName = (e) => {
    setProdName(e.target.value);
    validateNameInput(e.target.value);
  };
  const changeShortDesc = (e) => {
    setShortDesc(e.target.value);
    validateShortDescInput(e.target.value);
  };
  const changeLongDesc = (e) => {
    setLongDesc(e.target.value);
    validateLongDescInput(e.target.value);
  };
  const changePrice = (e) => {
    setProductPrice(e.target.value);
    validatePriceInput(e.target.value);
  };
  const changeWeight = (e) => {
    setWeight(e.target.value);
    validateWeightInput(e.target.value);
    setVolumeError(!validateInputLength(e.target.value, 1) ? false : true);
  };
  const changeVolume = (e) => {
    setWidth(e.target.value);
    validateVolumeInput(e.target.value);
  };
  const changeQuont = (e) => {
    setQuantity(e.target.value);
    validateQuantityInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isNameError = validateInputLength(prodName, 2);
    let isShortDescError = validateInputLength(shortDesc, 2);
    let isLongDescError = validateInputLength(longDesc, 20);
    let isPriceError = validateInputLength(productPrice, 1);
    let isWeightError = validateInputLength(weight, 1);
    let isVolumeError = validateInputLength(volume, 1);
    let isHeightError = validateInputLength(height, 1);
    let isLengthError = validateInputLength(length, 1);
    let isQuonError = validateInputLength(quantity, 1);
    let isCountryError = selectedCategoryId !== null;
    let isStateError = selectedTypeId !== null;
    let isCityError = words.length > 0;
    let isPhoto = uploadedImages.length > 0;
    setNameError(isNameError);
    setShortDescError(isShortDescError);
    setLongDescError(isLongDescError);
    setPriceError(isPriceError);
    if (!isWeightError && !isVolumeError) {
      setWeightError(isWeightError);
      setVolumeError(isVolumeError);
    }
    if (isWeightError || isVolumeError || isHeightError || isLengthError) {
      setWeightError(true);
      setVolumeError(true);
      setLengthError(true);
      setLengthError(true);
      isWeightError = true;
      isVolumeError = true;
      isHeightError = true;
      isLengthError = true;
    }
    setProdCatError(isCountryError);
    setProdTypeError(isStateError);
    setQuontError(isQuonError);
    setIngridientError(isCityError);
    setPicError(isPhoto);
    if (
      !isNameError ||
      !isShortDescError ||
      !isLongDescError ||
      !isPriceError ||
      !isWeightError ||
      !isVolumeError ||
      !isHeightError ||
      !isLengthError ||
      !isCountryError ||
      !isStateError ||
      !isQuonError ||
      !isCityError ||
      !isPhoto
    ) {
      return; // Якщо хоча б одна з умов не виконується, вийти з функції
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add`,
        {
          prodName,
          shortDesc,
          longDesc,
          selectedCategoryId,
          selectedTypeId,
          glass: parseInt(glass),
          metal: parseInt(metal),
          paper: parseInt(paper),
          plastic: parseInt(plastic),
          sizes,
          shape,
          scent,
          color,
          productPrice: parseInt(productPrice),
          weight: parseInt(weight),

          volume: parseInt(volume),
          width: parseInt(width),
          height: parseInt(height),
          length: parseInt(length),
          quantity: parseInt(quantity),
          activeCategories,
          activeNames,
          words,
          wordsWithout,
          instruction,
          vendorId: users.id,
          local_pickup: localPickUp ? "true" : "false",
          // Додайте інші дані тут
        }
      );
      const id = response.data.id;
      if (response) {
        setPopUp(true);
      }
      sendFile(id);
      // Відправка завантажених зображень

      // Очистити інші поля тут
    } catch (error) {
      console.error("Помилка при відправленні даних на сервер:", error);
    }
  };
  const skipToDash = () => {
    navigate("/vendor/dashboard");
  };
  useEffect(() => {
    // Пошук об'єкта, де firebase_id === activeUser.uid
    const found = data.find((item) => item.firebase_id === activeUser.uid);

    // Оновлення стану знайденого об'єкта
    setUsers(found);
  }, [data, activeUser]);
  const changeHeight = (e) => {
    setHeight(e.target.value);
    validateHeightInput(e.target.value);
  };
  const validateHeightInput = (name) => {
    setHeightError(!validateInputLength(name, 1) ? false : true);
  };
  const validateLengthInput = (name) => {
    setLengthError(!validateInputLength(name, 1) ? false : true);
  };
  const changeLength = (e) => {
    setLength(e.target.value);
    validateLengthInput(e.target.value);
  };
  return (
    <>
      <div className={css.regWrap}>
        <div className={css.headerWrap}>
          <ReactSVG src={logo} />
          <button className={css.buttonSkip} onClick={skipToDash}>
            Skip
          </button>
        </div>
        <div className={css.titleWrap}>
          <p className={css.titleReg}>Add products</p>
          <p className={css.titleDesc}>
            Add your first product or upload an entire database. You can skip
            this step and upload products later.
          </p>
          <div className={css.lineWrap}>
            <div className={css.lineGreen}></div>
            <div className={css.lineGreen}></div>
            <div className={css.lineGreen}></div>
          </div>
        </div>
        <div className={css.addProductWrap}>
          <LeftSide
            setUploadedImages={setUploadedImages}
            uploadedImages={uploadedImages}
            setUploadedVideos={setUploadedVideos}
            uploadedVideos={uploadedVideos}
            productPrice={productPrice}
            setWeight={setWeight}
            weight={weight}
            setVolume={setVolume}
            volume={volume}
            setQuantity={setQuantity}
            quantity={quantity}
            setActiveCategories={setActiveCategories}
            activeCategories={activeCategories}
            setActiveNames={setActiveNames}
            activeNames={activeNames}
            setWords={setWords}
            words={words}
            longDesc={longDesc}
            setActiveCategoriesAndNames={setActiveCategoriesAndNames}
            activeCategoriesAndNames={activeCategoriesAndNames}
            changePrice={changePrice}
            validatePriceInput={validatePriceInput}
            priceError={priceError}
            changeWeight={changeWeight}
            validateWeightInput={validateWeightInput}
            weightError={weightError}
            changeVolume={changeVolume}
            validateVolumeInput={validateVolumeInput}
            volumeError={volumeError}
            changeQuont={changeQuont}
            validateQuantityInput={validateQuantityInput}
            quontError={quontError}
            ingridientError={ingridientError}
            picError={picError}
            setPicError={setPicError}
            setIngridientError={setIngridientError}
            setIngridientWithotError={setIngridientWithotError}
            ingridientWithotError={ingridientWithotError}
            setWordsWithout={setWordsWithout}
            wordsWithout={wordsWithout}
            width={width}
            setWidth={setWidth}
            height={height}
            setHeight={setHeight}
            length={length}
            setLength={setLength}
            changeHeight={changeHeight}
            validateHeightInput={validateHeightInput}
            changeLength={changeLength}
            validateLengthInput={validateLengthInput}
            heightError={heightError}
            lengthError={lengthError}
          />
          <RightSide
            setShortDesc={setShortDesc}
            shortDesc={shortDesc}
            setProdName={setProdName}
            prodName={prodName}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedTypeId={setSelectedTypeId}
            setGlass={setGlass}
            setMetal={setMetal}
            setPaper={setPaper}
            setPlastic={setPlastic}
            setSizes={setSizes}
            sizes={sizes}
            setShape={setShape}
            shape={shape}
            setScent={setScent}
            scent={scent}
            setColor={setColor}
            color={color}
            setLongDesc={setLongDesc}
            handleSubmit={handleSubmit}
            longDesc={longDesc}
            validateNameInput={validateNameInput}
            nameError={nameError}
            validateShortDescInput={validateShortDescInput}
            shortDescError={shortDescError}
            validateLongDescInput={validateLongDescInput}
            longDescError={longDescError}
            changeName={changeName}
            changeShortDesc={changeShortDesc}
            changeLongDesc={changeLongDesc}
            prodCatError={prodCatError}
            prodTypeError={prodTypeError}
            setProdCatError={setProdCatError}
            setProdTypeError={setProdTypeError}
            instruction={instruction}
            setInstruction={setInstruction}
            localPickUp={localPickUp}
            setLocalPickUp={setLocalPickUp}
          />
        </div>

        {popUp && (
          <PopUpNext
            startNewProd={startNewProd}
            setAddProdPage={setAddProdPage}
            skipToDash={skipToDash}
          />
        )}
      </div>
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
)(AddProduct);

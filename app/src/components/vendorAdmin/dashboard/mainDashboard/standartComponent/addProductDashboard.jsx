import css from "../../../vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../../../../svg/logo-inline.svg";
import upload from "../../../../../svg/upload.svg";
import logoRec from "../../../../../img/Rectangle4.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../../../../svg/chevron.svg";
import LeftSide from "./addProdComponents/leftSide";
import RightSide from "./addProdComponents/rightSide";
import axios from "axios";
import PopUpNext from "./popUpNext";

const AddProductDashboard = ({ setProdList, setAddProduct, users }) => {
  const navigate = useNavigate();
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
  const [shape, setShape] = useState([{ shape: "", price: 0 }]);
  const [scent, setScent] = useState([{ scent: "", price: 0 }]);
  const [color, setColor] = useState([{ color: "", price: 0 }]);
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

  //////////////////////////////////////////////////////////////////////////////

  const [nameError, setNameError] = useState(true);
  const [shortDescError, setShortDescError] = useState(true);
  const [longDescError, setLongDescError] = useState(true);
  const [priceError, setPriceError] = useState(true);
  const [weightError, setWeightError] = useState(true);
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
    setScent([{ scent: "", price: 0 }]);
    setShape([{ shape: "", price: 0 }]);
    setColor([{ color: "", price: 0 }]);
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
        `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/file/${id}`,
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
    setVolume(e.target.value);
    validateVolumeInput(e.target.value);
    setWeightError(!validateInputLength(e.target.value, 1) ? false : true);
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
    if (isWeightError || isVolumeError) {
      setWeightError(true);
      setVolumeError(true);
      isWeightError = true;
      isVolumeError = true;
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
      !isCountryError ||
      !isStateError ||
      !isQuonError ||
      !isCityError ||
      !isPhoto
    ) {
      console.log(!isWeightError);
      console.log("Зайшло в ерор");
      return; // Якщо хоча б одна з умов не виконується, вийти з функції
    }
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/add`,
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
  const cancelFromProd = () => {
    setProdList(true);
    setAddProduct(false);
  };
  return (
    <>
      <div className={css.regWrap}>
        <div className={css.headerWrap}>
          <p className={css.createNewProduct}>Create new product</p>

          <div className={css.twoButtWr}>
            <button className={css.canselBut} onClick={cancelFromProd}>
              Cancel
            </button>
            <button className={css.buttonSubmit} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>

        <div className={css.addProductWrapDash}>
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
          {popUp && (
            <PopUpNext
              startNewProd={startNewProd}
              cancelFromProd={cancelFromProd}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default AddProductDashboard;

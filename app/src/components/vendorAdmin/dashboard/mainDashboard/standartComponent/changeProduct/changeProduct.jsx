import css from "../../../../vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../../../../../svg/logo-inline.svg";
import upload from "../../../../../../svg/upload.svg";
import logoRec from "../../../../../../img/Rectangle4.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../../../../../../svg/chevron.svg";
import LeftSide from "./addProdComponents/leftSide";
import RightSide from "./addProdComponents/rightSide";
import axios from "axios";
import PopUpNext from "./addProdComponents/popUpNext";

const ChangeProduct = ({
  setProdList,
  setAddProduct,
  productForChange,
  setProductForChange,
  changeProdFinal,
  setChangeProduct,
}) => {
  const navigate = useNavigate();
  const [popUp, setPopUp] = useState(false);
  const [prodName, setProdName] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [glass, setGlass] = useState(null);
  const [metal, setMetal] = useState(null);
  const [picError, setPicError] = useState(true);
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
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [instruction, setInstruction] = useState("");
  const [localPickUp, setLocalPickUp] = useState(false);
  const [wordsWithout, setWordsWithout] = useState([]);
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
  const [fin, setFin] = useState(false);
  const validateInputLength = (input, min) => {
    if (input === null) {
      return false;
    } else {
      return input.length >= min;
    }
  };

  useEffect(() => {
    if (productForChange) {
      setInstruction(productForChange.instructions);
      setLocalPickUp(JSON.parse(productForChange.local_pickup));
      const uniqueCategories = Array.from(
        new Set(productForChange.certificates.map((item) => item.certif_cat))
      );
      const uniqueSubcategories = Array.from(
        new Set(
          productForChange.certificates.map((item) => item.certif_sub_cat)
        )
      );
      setActiveCategories(uniqueCategories);

      // Створюємо масиви для зберігання унікальних значень категорій та підкатегорій
      const names = [];

      // Додаємо унікальні значення категорій та підкатегорій до відповідних масивів
      uniqueCategories.forEach((category) => {
        uniqueSubcategories.forEach((subcategory) => {
          names.push({ category, subcategory });
        });
      });

      // Оновлюємо стан setActiveNames зі збереженими значеннями
      setActiveNames(names);
      ////

      setProdName(productForChange.product_name);
      setShortDesc(productForChange.short_description);
      setLongDesc(productForChange.long_description);

      let shapes = [];
      let scents = [];
      let colors = [];

      // Обробляємо кожен елемент масиву variations
      productForChange.variations.forEach((el) => {
        const value = el.parameter_value;
        const price = parseFloat(el.price);

        // Перевіряємо, чи значення value та price є числовими
        if (!isNaN(price)) {
          // В залежності від значення unit додаємо дані до відповідного масиву
          if (el.unit === "shape") {
            shapes.push({ shape: value, price: price });
          } else if (el.unit === "scent") {
            scents.push({ scent: value, price: price });
          } else if (el.unit === "color") {
            colors.push({ color: value, price: price });
          }
        }
      });

      setShape(shapes);
      setScent(scents);
      setColor(colors);
      if (shapes.length === 0) {
        setShape([{ shape: "", price: 0 }]);
      }
      if (scents.length === 0) {
        setScent([{ scent: "0", price: 0 }]);
      }
      if (colors.length === 0) {
        setColor([{ color: "0", price: 0 }]);
      }

      productForChange.dimensions.forEach((el, index) => {
        const price = parseFloat(el.price);
        const weight = parseFloat(el.weight);
        const volume = parseFloat(el.volume);

        if (index === 0) {
          setProductPrice(price);
          if (isNaN(weight)) {
            setWeight(0);
          } else {
            setWeight(weight);
          }

          if (isNaN(volume)) {
            setVolume(0);
          } else {
            setVolume(volume);
          }
        } else if (index === 1) {
          setSizes([{ weight: weight, volume: volume, price: price }]);
        } else {
          setSizes((prevSizes) => [
            ...prevSizes,
            { weight: weight, volume: volume, price: price },
          ]);
        }
      });
      setQuantity(productForChange.quantity);
      const splitWords = productForChange.ingredients
        .split(",")
        .map((word) => word.trim());
      // Оновлюємо стан масиву слів
      setWords(splitWords);
      const splitWithout = productForChange.made_without
        .split(",")
        .map((word) => word.trim());
      // Оновлюємо стан масиву слів
      setWordsWithout(splitWithout);
    }
  }, []);

  const [activeCategoriesAndNames, setActiveCategoriesAndNames] = useState({
    activeCategories: [],
    activeNames: [],
  });
  const cancelFromProd = () => {
    setProdList(true);
    setAddProduct(false);
  };
  useEffect(() => {
    if (productForChange) {
      let isNameError = validateInputLength(prodName, 2);
      let isShortDescError = validateInputLength(shortDesc, 2);
      let isLongDescError = validateInputLength(longDesc, 20);
      let isPriceError = validateInputLength(productPrice.toString(), 1);
      let isWeightError = validateInputLength(weight.toString(), 1);
      let isVolumeError = validateInputLength(volume.toString(), 1);
      let isQuonError = validateInputLength(quantity.toString(), 1);
      let isCountryError = selectedCategoryId !== null;
      let isStateError = selectedTypeId !== null;
      let isCityError = words.length > 0;
      let isPhoto =
        uploadedImages.length > 0 || productForChange.files.length > 0;
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
    }
  });
  const startNewProd = () => {
    setWords([]);
    setUploadedImages([]);
    setUploadedVideos([]);
    setActiveCategories([]);
    setActiveNames([]);
    setQuantity("");
    setVolume("");
    setWeight("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSizes((prevSizes) => [
    //   { weight: weight, volume: volume, price: productPrice },
    //   ...prevSizes.slice(1), // Залишити всі інші елементи без змін
    // ]);
    const newEntry = {
      weight: parseFloat(weight),
      volume: parseFloat(volume),
      price: parseFloat(productPrice),
    };
    const newSizes = [newEntry, ...sizes];

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/update/${productForChange.id}`,
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
          sizes: newSizes,
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
          vendorId: productForChange.vendorId,
          local_pickup: localPickUp ? "true" : "false",
          // Додайте інші дані тут
        }
      );
      if (response) {
        setFin(true);
      }
      if (uploadedImages.length > 0 || uploadedVideos.length > 0) {
        sendFile(productForChange.id);
      }

      // Видалення логіки для відправки файлів, оскільки ця логіка залишається такою ж, як і раніше
    } catch (error) {
      console.error("Помилка при відправленні даних на сервер:", error);
    }
  };
  const skipToDash = () => {
    navigate("/vendor/dashboard");
  };
  const handleDeleteFile = async (fileId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/fileAdd/${fileId}`
      );

      // Перевірка статусу відповіді
      if (response.status === 200) {
        const updatedFiles = productForChange.files.filter(
          (file) => file.id !== fileId
        );
        // Оновлюємо стан productForChange, передаючи оновлений масив files
        setProductForChange({ ...productForChange, files: updatedFiles });
      } else {
        // Обробка помилки під час видалення файлу
        console.error(
          "Failed to delete file. Server responded with status:",
          response.status
        );
      }
    } catch (error) {
      // Обробка помилки під час виконання запиту
      console.error("There was a problem with your Axios request:", error);
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
  return (
    <>
      <div className={css.regWrap}>
        <div className={css.headerWrap}>
          <p className={css.createNewProduct}>
            Edit #{productForChange.product_name}
          </p>

          <div className={css.twoButtWr}>
            <button className={css.canselBut} onClick={changeProdFinal}>
              Cancel
            </button>
            <button className={css.buttonSubmit} onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>

        <div className={css.addProductWrapDash}>
          <LeftSide
            handleDeleteFile={handleDeleteFile}
            setUploadedImages={setUploadedImages}
            uploadedImages={uploadedImages}
            setUploadedVideos={setUploadedVideos}
            uploadedVideos={uploadedVideos}
            setProductPrice={setProductPrice}
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
            productForChange={productForChange}
            setWordsWithout={setWordsWithout}
            wordsWithout={wordsWithout}
            setPicError={setPicError}
            priceError={priceError}
            picError={picError}
            weightError={weightError}
            volumeError={volumeError}
            quontError={quontError}
            ingridientError={ingridientError}
            changePrice={changePrice}
            changeWeight={changeWeight}
            changeVolume={changeVolume}
            validatePriceInput={validatePriceInput}
            validateWeightInput={validateWeightInput}
            validateVolumeInput={validateVolumeInput}
            changeQuont={changeQuont}
            validateQuantityInput={validateQuantityInput}
            setIngridientError={setIngridientError}
          />
          <RightSide
            setShortDesc={setShortDesc}
            shortDesc={shortDesc}
            setProdName={setProdName}
            prodName={prodName}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedTypeId={setSelectedTypeId}
            setGlass={setGlass}
            glass={glass}
            paper={paper}
            plastic={plastic}
            metal={metal}
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
            cancelFromProd={cancelFromProd}
            productForChange={productForChange}
            instruction={instruction}
            setInstruction={setInstruction}
            localPickUp={localPickUp}
            setLocalPickUp={setLocalPickUp}
            nameError={nameError}
            shortDescError={shortDescError}
            longDescError={longDescError}
            prodCatError={prodCatError}
            prodTypeError={prodTypeError}
            changeName={changeName}
            changeShortDesc={changeShortDesc}
            changeLongDesc={changeLongDesc}
            validateNameInput={validateNameInput}
            validateShortDescInput={validateShortDescInput}
            validateLongDescInput={validateLongDescInput}
          />
          {fin && <PopUpNext changeProdFinal={changeProdFinal} />}
        </div>
      </div>
    </>
  );
};
export default ChangeProduct;

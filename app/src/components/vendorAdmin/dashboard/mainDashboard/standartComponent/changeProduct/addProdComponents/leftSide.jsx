import { useCallback, useState } from "react";
import css from "../../../../../vendorReg/vendorReg.module.css";
import "./styleT.css";
import { useDropzone } from "react-dropzone";
import upload from "../../../../../../../svg/upload2.svg";
import { ReactSVG } from "react-svg";
import cancel from "../../../../../../../svg/Union.svg";
import smile from "../../../../../../../svg/smile.svg";

import Certificat from "./certificat";
const LeftSide = ({
  setIngridientError,
  productPrice,
  setWeight,
  weight,
  setVolume,
  volume,
  setQuantity,
  quantity,
  setActiveCategories,
  activeCategories,
  setActiveNames,
  activeNames,
  setWords,
  words,
  setUploadedImages,
  uploadedImages,
  setUploadedVideos,
  uploadedVideos,
  changePrice,
  validatePriceInput,
  priceError,
  changeWeight,
  validateWeightInput,
  weightError,
  changeVolume,
  validateVolumeInput,
  volumeError,
  changeQuont,
  validateQuantityInput,
  quontError,
  ingridientError,
  picError,
  setPicError,
  setIngridientWithotError,
  ingridientWithotError,
  setWordsWithout,
  wordsWithout,
  productForChange,
  handleDeleteFile,
  width,
  setWidth,
  height,
  setHeight,
  length,
  setLength,
  changeHeight,
  validateHeightInput,
  changeLength,
  validateLengthInput,
  heightError,
  lengthError,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    const imageFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("image")
    );
    const videoFiles = acceptedFiles.filter((file) =>
      file.type.startsWith("video")
    );
    if (imageFiles.length > 0) {
      setPicError(true);
    }
    setUploadedImages((prevUploadedImages) => [
      ...prevUploadedImages,
      ...imageFiles,
    ]);
    setUploadedVideos((prevUploadedVideos) => [
      ...prevUploadedVideos,
      ...videoFiles,
    ]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  ///////////////////////////////////////////////////////////
  const [inputValue, setInputValue] = useState(""); // Стан для зберігання значення введеного тексту
  const [valueForWithout, setValueForWithout] = useState("");
  const handleChangeWithout = (event) => {
    setValueForWithout(event.target.value);
  };
  const handleDeleteImage = (index) => {
    setUploadedImages((prevUploadedImages) =>
      prevUploadedImages.filter((_, i) => i !== index)
    );
  };

  const handleDeleteVideo = (index) => {
    setUploadedVideos((prevUploadedVideos) =>
      prevUploadedVideos.filter((_, i) => i !== index)
    );
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      setIngridientError(true);
      event.preventDefault();
      const trimmedValue = inputValue.trim();
      if (trimmedValue !== "") {
        // Розділити введений текст на слова після кожної коми
        const newWords = trimmedValue.split(",").map((word) => word.trim());
        // Додати кожне слово окремо до масиву слів
        setWords([...words, ...newWords]);
        setInputValue(""); // Очистити поле вводу
      }
    }
  };
  const handleKeyDownWithou = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      setIngridientWithotError(true);
      event.preventDefault();
      const trimmedValue = valueForWithout.trim();
      if (trimmedValue !== "") {
        // Розділити введений текст на слова після кожної коми
        const newWords = trimmedValue.split(",").map((word) => word.trim());
        // Додати кожне слово окремо до масиву слів
        setWordsWithout([...wordsWithout, ...newWords]);
        setValueForWithout(""); // Очистити поле вводу
      }
    }
  };

  // Додавання слова до масиву слів
  const addWord = () => {
    const trimmedValue = inputValue.trim();
    if (trimmedValue !== "") {
      setWords([...words, trimmedValue]); // Додаємо слово до списку слів
      setInputValue(""); // Очищаємо поле введення
    }
  };

  const removeWord = (index) => {
    const newWords = [...words];
    newWords.splice(index, 1); // Видаляємо слово за індексом
    setWords(newWords); // Оновлюємо список слів
  };
  const removeWordWithout = (index) => {
    const newWords = [...wordsWithout];
    newWords.splice(index, 1); // Видаляємо слово за індексом
    setWordsWithout(newWords); // Оновлюємо список слів
  };

  return (
    <div className={css.leftSideWrap}>
      <div
        {...getRootProps()}
        className={picError ? css.dropzoneStyle : css.dropzoneStyleNot}
      >
        <input {...getInputProps({ accept: "image/*,video/*" })} />

        {isDragActive ? (
          <p>Click to upload Photo/Video or drag and drop</p>
        ) : (
          <div className={css.txWrap}>
            <ReactSVG src={upload} className={css.svgStyle} />
            <p className={css.pForDrO}>
              Click to upload Photo/Video or drag and drop
            </p>
            <p className={css.pForDrS}>
              *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
              <span className={css.pForDrSpan}>280х432px.</span>
            </p>
          </div>
        )}
      </div>
      <div className={css.wrapPhotoAndVidoe}>
        {uploadedImages.length > 0 && (
          <label className={css.labelInp}>Photo</label>
        )}
        <div className={css.dropWrapI}>
          {productForChange.files.map((file, index) => {
            if (file.type === "photo") {
              return (
                <div className={css.wrapImgWiBut}>
                  <img
                    key={index}
                    className={css.imgDr}
                    src={file.file}
                    alt={`Uploaded image ${index}`}
                  />
                  <ReactSVG
                    src={cancel}
                    className={css.deleteBtn}
                    onClick={() => handleDeleteFile(file.id)}
                  />
                </div>
              );
            }
          })}
          {uploadedImages.map((file, index) => (
            <div className={css.wrapImgWiBut}>
              <img
                key={index}
                className={css.imgDr}
                src={URL.createObjectURL(file)}
                alt={`Uploaded image ${index}`}
              />

              <ReactSVG
                src={cancel}
                className={css.deleteBtn}
                onClick={() => handleDeleteImage(index)}
              />
            </div>
          ))}
        </div>
        {uploadedVideos.length > 0 && (
          <label className={css.labelInp}>Video</label>
        )}
        <div className={css.dropWrapI}>
          {productForChange.files.map((file, index) => {
            if (file.type === "video") {
              return (
                <div className={css.wrapImgWiBut}>
                  <video
                    key={index}
                    className={css.imgDr}
                    src={file.file}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                  <ReactSVG
                    src={cancel}
                    className={css.deleteBtn}
                    onClick={() => handleDeleteFile(file.id)}
                  />
                </div>
              );
            }
          })}
          {uploadedVideos.map((file, index) => (
            <div className={css.wrapImgWiBut}>
              <video
                key={index}
                className={css.imgDr}
                src={URL.createObjectURL(file)}
                controls
              >
                Your browser does not support the video tag.
              </video>
              <ReactSVG
                src={cancel}
                className={css.deleteBtn}
                onClick={() => handleDeleteVideo(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={css.priceWrap}>
        <label className={css.labelInpBold}>Price</label>
        <div className={css.priceWrapSmall}>
          <label className={priceError ? css.labelInp : css.labelInpNot}>
            Unit price
          </label>
          <div className={css.wrapPriceInput}>
            <ReactSVG src={smile} className={css.smileSvg} />
            <input
              className={priceError ? css.proceInput : css.proceInputNot}
              value={productPrice}
              onChange={changePrice}
              placeholder="10$"
              onBlur={() => validatePriceInput(productPrice)}
            />
          </div>
        </div>
      </div>
      <div className={css.priceWrapNew}>
        <label className={css.labelInpBold}>Size</label>
        <div className={css.priceWrapSmallFl}>
          <div className={css.oneSmalInp}>
            <label className={weightError ? css.labelInp : css.labelInpNot}>
              Weight
            </label>

            <input
              className={
                weightError ? css.proceInputSmal : css.proceInputSmalNot
              }
              value={weight}
              onBlur={() => validateWeightInput(weight)}
              onChange={changeWeight}
              placeholder="3oz"
            />
          </div>

          <div className={css.oneSmalInp}>
            <label className={volumeError ? css.labelInp : css.labelInpNot}>
              Width
            </label>

            <input
              className={
                volumeError ? css.proceInputSmal : css.proceInputSmalNot
              }
              value={width}
              onBlur={() => validateVolumeInput(width)}
              onChange={changeVolume}
              placeholder=""
            />
          </div>
        </div>
        <div className={css.priceWrapSmallFl}>
          <div className={css.oneSmalInp}>
            <label className={heightError ? css.labelInp : css.labelInpNot}>
              Height
            </label>

            <input
              className={
                heightError ? css.proceInputSmal : css.proceInputSmalNot
              }
              value={height}
              onBlur={() => validateHeightInput(height)}
              onChange={changeHeight}
              placeholder=""
            />
          </div>

          <div className={css.oneSmalInp}>
            <label className={lengthError ? css.labelInp : css.labelInpNot}>
              Length
            </label>

            <input
              className={
                lengthError ? css.proceInputSmal : css.proceInputSmalNot
              }
              value={length}
              onBlur={() => validateLengthInput(length)}
              onChange={changeLength}
              placeholder=""
            />
          </div>
        </div>
      </div>
      <div className={css.priceWrap}>
        <label className={css.labelInpBold}>Inventory</label>
        <div className={css.priceWrapSmall}>
          <label className={quontError ? css.labelInp : css.labelInpNot}>
            Available stock
          </label>

          <input
            className={quontError ? css.proceInputQu : css.proceInputQuNot}
            value={quantity}
            onBlur={() => validateQuantityInput(quantity)}
            onChange={changeQuont}
            placeholder="2568"
          />
        </div>
      </div>
      {/*////////////////////////////////////////////// */}
      <div className={css.priceWrapContainer}>
        <label className={css.labelInpBold}>Ingredients</label>
        <div className={css.priceWrapSmallWord}>
          <label className={ingridientError ? css.labelInp : css.labelInpNot}>
            Ingredients
          </label>
          <input
            type="text"
            className={ingridientError ? css.proceInputte : css.proceInputteNot}
            value={inputValue}
            onChange={handleChange}
            placeholder=""
            onKeyDown={handleKeyDown} // Додаємо обробник події натискання клавіш
          />
          {words.length > 0 && (
            <div className={css.wordsInInput}>
              {words.map((word, index) => (
                <div key={index} className={css.word}>
                  {word}
                  {/* Кнопка для видалення */}

                  <ReactSVG
                    src={cancel}
                    className={css.cancelSvg}
                    onClick={() => removeWord(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <p className={css.pTOIngred}>
            Paste ingredient list” - “Please make sure to indicate the origin
            (source) of such ingredients as palm oil, mica, etc. to transparency
            in ingredient sourcing.
          </p>
        </div>
      </div>
      {/*///////////////////////////////// */}
      <div className={css.priceWrapContainer}>
        <label className={css.labelInpBold}>Made without</label>
        <div className={css.priceWrapSmallWord}>
          <label className={css.labelInp}>Ingredients</label>
          <input
            type="text"
            className={css.proceInputte}
            value={valueForWithout}
            onChange={handleChangeWithout}
            placeholder=""
            onKeyDown={handleKeyDownWithou} // Додаємо обробник події натискання клавіш
          />
          {wordsWithout.length > 0 && (
            <div className={css.wordsInInput}>
              {wordsWithout.map((wordsWithout, index) => (
                <div key={index} className={css.word}>
                  {wordsWithout}
                  {/* Кнопка для видалення */}

                  <ReactSVG
                    src={cancel}
                    className={css.cancelSvg}
                    onClick={() => removeWordWithout(index)}
                  />
                </div>
              ))}
            </div>
          )}
          <p className={css.pTOIngred}>
            E.g. animal-based products, animal testing, GMO, parabens, SLS, etc.
          </p>
        </div>
      </div>
      <Certificat
        setActiveCategories={setActiveCategories}
        activeCategories={activeCategories}
        setActiveNames={setActiveNames}
        activeNames={activeNames}
      />
    </div>
  );
};
export default LeftSide;

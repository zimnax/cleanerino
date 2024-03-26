import { useState } from "react";
import css from "../../../../vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../../../../../svg/chevron.svg";
import ProdType from "./prodType";
import ProdCategory from "./prodCategory";
import Packaging from "./packaging";
import Diman from "./diman";
import Size from "./size";
import Shape from "./shape";
import Scent from "./scent";
const RightSide = ({
  validateNameInput,
  setShortDesc,
  shortDesc,
  setProdName,
  prodName,
  setSelectedCategoryId,
  setSelectedTypeId,
  setGlass,
  setMetal,
  setPaper,
  setPlastic,
  setSizes,
  sizes,
  setShape,
  shape,
  setScent,
  scent,
  setColor,
  color,
  setLongDesc,
  longDesc,
  handleSubmit,
  nameError,
  validateShortDescInput,
  shortDescError,
  validateLongDescInput,
  longDescError,
  changeName,
  changeShortDesc,
  changeLongDesc,
  prodCatError,
  prodTypeError,
  setProdCatError,
  setProdTypeError,
  instruction,
  setInstruction,
  localPickUp,
  setLocalPickUp,
}) => {
  const [newDetail, setNewDetail] = useState(false);
  const handleRadioChange = () => {
    setLocalPickUp(!localPickUp);
  };
  return (
    <div className={css.rightSideWrap}>
      <div className={css.priceWrapRight}>
        <label className={css.labelInpBold}>Basic information</label>
        <div className={css.priceWrapBig}>
          <label className={nameError ? css.labelInp : css.labelInpNot}>
            Product name
          </label>
          <div className={css.wrapPriceInput}>
            <input
              className={nameError ? css.proceInputBig : css.proceInputBigNot}
              placeholder="Body wash"
              onChange={changeName}
              value={prodName}
              onBlur={() => validateNameInput(prodName)}
            />
          </div>
        </div>
        <div className={css.priceWrapBig}>
          <label className={shortDescError ? css.labelInp : css.labelInpNot}>
            Short description
          </label>
          <div className={css.wrapPriceInput}>
            <input
              className={
                shortDescError ? css.proceInputBig : css.proceInputBigNot
              }
              placeholder="Invigorating vegan body wash"
              onBlur={() => validateShortDescInput(shortDesc)}
              onChange={changeShortDesc}
              value={shortDesc}
            />
          </div>
        </div>
        <div className={css.priceWrapBigTe}>
          <label className={longDescError ? css.labelInp : css.labelInpNot}>
            Long description
          </label>

          <textarea
            className={longDescError ? css.textAreaDesc : css.textAreaDescNot}
            placeholder="Gentle body wash, crafted for daily use and sensitive skin. Formulated with plant-based ingredients, it offers a luxurious cleanse, leaving your skin refreshed and nourished."
            onChange={changeLongDesc}
            value={longDesc}
            onBlur={() => validateLongDescInput(longDesc)}
          />
        </div>
        <div className={css.priceWrapBigTe}>
          <label className={css.labelInp}>How to use</label>

          <textarea
            className={css.textAreaDesc}
            placeholder="Instructions for using your product"
            onChange={(e) => setInstruction(e.target.value)}
            value={instruction}
          />
        </div>
        <div className={css.returnWr}>
          <div className={css.wrapChack}>
            <label className={css.labelInp}>Local pick-up</label>
            <div className={css.chaWr}>
              <label className={css.check} onClick={handleRadioChange}>
                <input
                  name="localPickup"
                  type="radio"
                  className={css.check__check}
                  checked={localPickUp}
                  onChange={() => {}} // Порожня функція, щоб уникнути помилок
                />
                <span className={css.check__indicator}></span>
              </label>
              {!localPickUp && <p className={css.of}>Off</p>}
              {localPickUp && <p className={css.on}>On</p>}
            </div>
          </div>
          {localPickUp && (
            <p className={css.downRetWr}>
              Customers will be able to pick up your product locally
            </p>
          )}
          {!localPickUp && (
            <p className={css.downRetWr}>
              Customers will not be able to pick up your product locally
            </p>
          )}
        </div>
      </div>
      <div className={css.priceWrap}>
        <label className={css.labelInpBold}>Category</label>
        <div className={css.priceWrapSmallBig}>
          <ProdCategory
            prodCatError={prodCatError}
            prodTypeError={prodTypeError}
            setSelectedCategoryId={setSelectedCategoryId}
            setSelectedTypeId={setSelectedTypeId}
            setProdCatError={setProdCatError}
            setProdTypeError={setProdTypeError}
          />
        </div>
      </div>
      <Packaging
        setGlass={setGlass}
        setMetal={setMetal}
        setPaper={setPaper}
        setPlastic={setPlastic}
      />
      <div className={css.priceWrapRightDiferent}>
        <label className={css.labelInpBold}>
          Does this product come in different sizes, shapes, scents, or colors?
        </label>
        <div className={css.wrapButtonAdd}>
          <button
            className={newDetail ? css.buttonNo : css.buttonNoYes}
            onClick={() => setNewDetail(false)}
          >
            No
          </button>
          <button
            className={newDetail ? css.buttonYesYes : css.buttonYesNo}
            onClick={() => setNewDetail(true)}
          >
            Yes, add a variation
          </button>
        </div>
      </div>
      {newDetail && (
        <>
          {" "}
          <Size setSizes={setSizes} sizes={sizes} />
          <Shape setShape={setShape} shape={shape} />
          <Scent setScent={setScent} scent={scent} />
          <Diman setColor={setColor} color={color} />
        </>
      )}

      <div className={css.twoButtWr}>
        <button className={css.canselBut}>Cancel</button>
        <button className={css.buttonSubmit} onClick={handleSubmit}>
          Publish
        </button>
      </div>
    </div>
  );
};
export default RightSide;

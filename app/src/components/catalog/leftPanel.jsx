import css from "./catalog.module.css";
import fil from "../../svg/Filtercategory.svg";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/Ingredients.svg";
import bran from "../../svg/fsdfgsf.svg";
import cat from "../../svg/Categoryfil.svg";
import arrowDownNew from "../../svg/arrowDownShop.svg";
import Brands from "./brands";
import Ingridients from "./ingridients";
import CategoryL from "./categoryL";
import Certifications from "./certifications";
import PickUp from "./pickUp";
import SkinType from "./skinType";
import SkinConcern from "./skinConcern";
import Alergens from "./alergens";
const LeftPanel = ({
  setSelectedCategoryIdArr,
  selectedCategoryIdArr,
  selectedCertificate,
  setSelectedCertificate,
  selectedIngridient,
  setSelectedIngridient,
  selectedSkinType,
  setSelectedSkinType,
  ingridietsArrayFromB,
  setIngridietsArrayFromB,
  selectedSkinConcer,
  setSelectedSkinConcer,
  setAlergens,
  selectedOption,
  setSelectedOption,
  setListOfProduct,
  listOfProduct,
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={css.leftPanelWrap}>
      <div className={css.smallPannelWrapLeft}>
        <div
          className={css.blockSortFirst}
          onClick={() => setOpenSort(!openSort)}
        >
          <p className={css.pSortInLeft}>Sort</p>
          <ReactSVG src={arrowDownNew} />
        </div>
        {openSort && (
          <div className={css.sortOption}>
            <div
              className={css.wrapButtonPrice}
              onClick={() =>
                setListOfProduct(
                  [...listOfProduct].sort(
                    (a, b) =>
                      parseFloat(a.dimensions[0]?.price) -
                      parseFloat(b.dimensions[0]?.price)
                  )
                )
              }
            >
              Sort by Price (Low to High)
            </div>
            <div
              className={css.wrapButtonPrice}
              onClick={() =>
                setListOfProduct(
                  [...listOfProduct].sort(
                    (a, b) =>
                      parseFloat(b.dimensions[0]?.price) -
                      parseFloat(a.dimensions[0]?.price)
                  )
                )
              }
            >
              Sort by Price (High to Low)
            </div>
          </div>
        )}
      </div>
      <div className={css.bigPannelWrapLeft}>
        <div className={css.topHeaderInLeft}>
          <div className={css.filtersWr}>
            <p className={css.fForAll}>Filters</p>
            <ReactSVG src={fil} className={css.filterIcon} />
          </div>
          <div className={css.savedWr}>
            <div className={css.wrapChack}>
              <label className={css.labelInp}>Saved Filters</label>
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
              </div>
            </div>
          </div>
        </div>
        <div className={css.allFiltersWrap}>
          {/* <Brands /> */}
          <Ingridients
            selectedIngridient={selectedIngridient}
            setSelectedIngridient={setSelectedIngridient}
            setIngridietsArrayFromB={setIngridietsArrayFromB}
          />
          <Alergens setAlergens={setAlergens} />
          <CategoryL
            setSelectedCategoryIdArr={setSelectedCategoryIdArr}
            selectedCategoryIdArr={selectedCategoryIdArr}
          />
          <Certifications
            selectedCertificate={selectedCertificate}
            setSelectedCertificate={setSelectedCertificate}
          />

          <PickUp
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
          <SkinType
            selectedSkinType={selectedSkinType}
            setSelectedSkinType={setSelectedSkinType}
          />
          <SkinConcern
            selectedSkinConcer={selectedSkinConcer}
            setSelectedSkinConcer={setSelectedSkinConcer}
          />
        </div>
      </div>
    </div>
  );
};
export default LeftPanel;

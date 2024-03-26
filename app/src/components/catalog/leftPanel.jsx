import css from "./catalog.module.css";
import fil from "../../svg/Filtersfs.svg";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/Ingredients.svg";
import bran from "../../svg/fsdfgsf.svg";
import cat from "../../svg/Categoryfil.svg";

import Brands from "./brands";
import Ingridients from "./ingridients";
import CategoryL from "./categoryL";
import Certifications from "./certifications";
import PickUp from "./pickUp";
import SkinType from "./skinType";
import SkinConcern from "./skinConcern";
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
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleRadioChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <div className={css.leftPanelWrap}>
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
        <CategoryL
          setSelectedCategoryIdArr={setSelectedCategoryIdArr}
          selectedCategoryIdArr={selectedCategoryIdArr}
        />
        <Certifications
          selectedCertificate={selectedCertificate}
          setSelectedCertificate={setSelectedCertificate}
        />

        <PickUp />
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
  );
};
export default LeftPanel;

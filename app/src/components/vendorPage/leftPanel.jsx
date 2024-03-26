import css from "./vendor.module.css";
import fil from "../../svg/Filtersfs.svg";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/Ingredients.svg";
import bran from "../../svg/fsdfgsf.svg";
import cat from "../../svg/Categoryfil.svg";
import star from "../../svg/StarCertif.svg";
import deliver from "../../svg/ph_truck-light.svg";
const LeftPanel = () => {
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
        <div className={css.oneLabelFilter}>
          <div className={css.labelWithIconWr}>
            <ReactSVG src={bran} className={css.filrersIcon} />
            <p className={css.fForAll}>Brands</p>
          </div>
          <ReactSVG src={arrDo} />
        </div>
        <div className={css.oneLabelFilter}>
          <div className={css.labelWithIconWr}>
            <ReactSVG src={ingridi} className={css.filrersIcon} />
            <p className={css.fForAll}>Ingredient Preferences</p>
          </div>
          <ReactSVG src={arrDo} />
        </div>
        <div className={css.oneLabelFilter}>
          <div className={css.labelWithIconWr}>
            <ReactSVG src={cat} className={css.filrersIcon} />
            <p className={css.fForAll}>Category</p>
          </div>
          <ReactSVG src={arrDo} />
        </div>
        <div className={css.oneLabelFilter}>
          <div className={css.labelWithIconWr}>
            <ReactSVG src={star} className={css.filrersIcon} />
            <p className={css.fForAll}>Certifications</p>
          </div>
          <ReactSVG src={arrDo} />
        </div>
        <div className={css.oneLabelFilter}>
          <div className={css.labelWithIconWr}>
            <ReactSVG src={deliver} className={css.filrersIcon} />
            <p className={css.fForAll}>Pickup & Delivery</p>
          </div>
          <ReactSVG src={arrDo} />
        </div>
      </div>
    </div>
  );
};
export default LeftPanel;

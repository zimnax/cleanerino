import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrDo from "../../svg/fdsewhj.svg";
import deliver from "../../svg/ph_truck-light.svg";
import arrowUp from "../../svg/ChevronIconApp.svg";
import { useState } from "react";
const PickUp = ({ selectedOption, setSelectedOption }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };
  return (
    <div className={css.wrapAllFilter}>
      <div
        className={
          isDropdownOpen ? css.oneLabelFilterCheck : css.oneLabelFilter
        }
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={css.labelWithIconWr}>
          <ReactSVG src={deliver} className={css.filrersIcon} />
          <p className={css.fForAll}>Pickup & Delivery</p>
        </div>
        {isDropdownOpen && <ReactSVG src={arrowUp} />}
        {!isDropdownOpen && <ReactSVG src={arrDo} />}
      </div>
      {isDropdownOpen && (
        <div className={css.dropdown}>
          <div
            className={css.dropdownItem}
            onClick={() => handleOptionClick("Local pick-up")}
          >
            <div
              className={
                selectedOption === "Local pick-up" ? css.kvadCheck : css.kvad
              }
            ></div>{" "}
            <p className={css.nameLocP}>Local pick-up</p>
          </div>
          <div
            className={css.dropdownItem}
            onClick={() => handleOptionClick("Delivery")}
          >
            <div
              className={
                selectedOption === "Delivery" ? css.kvadCheck : css.kvad
              }
            ></div>{" "}
            <p className={css.nameLocP}>Delivery</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default PickUp;

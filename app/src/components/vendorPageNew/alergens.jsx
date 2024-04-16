import css from "./catalog.module.css";
import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";
import { ReactSVG } from "react-svg";
import arrowUp from "../../svg/ChevronIconApp.svg";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/Ingredients.svg";
const Alergens = ({ setAlergens }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    "Nut-free",
    "Soy-free",
    "Latex-free",
    "Sesame-free",
    "Citrus-free",
    "Dye-free",
    "Fragrance-free",
    "Scent-free",
  ];

  const isCategorySelected = (categoryName) => {
    return selectedCategories.includes(categoryName);
  };

  const handleCategoryChange = (categoryName) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((cat) => cat !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(updatedSelectedCategories);
    setAlergens(updatedSelectedCategories);
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
          <ReactSVG src={ingridi} className={css.filrersIcon} />
          <p className={css.fForAll}>Allergens</p>
        </div>
        {isDropdownOpen ? <ReactSVG src={arrowUp} /> : <ReactSVG src={arrDo} />}
      </div>
      {isDropdownOpen && (
        <div className={css.dropdown}>
          <div
            className={css.dropdownItem}
            onClick={() => setSelectedCategories([])}
          >
            <div className={css.kvad}></div>
            <p className={css.nameLocP}>All</p>
          </div>
          {categories.map((category, index) => (
            <div
              key={index}
              className={css.dropdownItem}
              onClick={() => handleCategoryChange(category)}
            >
              <div
                className={
                  isCategorySelected(category) ? css.kvadCheck : css.kvad
                }
              ></div>{" "}
              <p
                className={
                  isCategorySelected(category)
                    ? css.nameLocPCheck
                    : css.nameLocP
                }
              >
                {category}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Alergens;

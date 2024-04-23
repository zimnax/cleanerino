import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrowUp from "../../svg/ChevronIconApp.svg";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/Ingredients.svg";
import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";

const Ingridients = ({
  selectedIngridient,
  setSelectedIngridient,
  data,
  setIngridietsArrayFromB,
}) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  useEffect(() => {
    setIngridietsArrayFromB(data);
  }, [data]);
  const categories = ["Vegetarian", "Vegan", "Gluten-free", "Paleo"];

  const isCategorySelected = (categoryName) => {
    return selectedCategories.includes(categoryName);
  };

  const handleCategoryChange = (categoryName) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((cat) => cat !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(updatedSelectedCategories);
    setSelectedIngridient(updatedSelectedCategories);
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
          <p className={css.fForAll}>Ingredient Preferences</p>
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

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/ingridients`
)(Ingridients);

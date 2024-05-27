import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrowUp from "../../svg/ChevronIconApp.svg";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/skinTypeIcon.svg";
import withMySQLData from "../HOK/withMySQLData";
import { useEffect, useState } from "react";
const SkinType = ({ selectedSkinType, setSelectedSkinType }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const skinType = [
    { id: 1, type: "Normal" },
    { id: 2, type: "Combination" },
    { id: 3, type: "Dry" },
    { id: 4, type: "Oily" },
    { id: 5, type: "Acne-prone" },
    { id: 6, type: "Sensitive" },
    { id: 7, type: "Mature" },
  ];

  const isCategorySelected = (categoryName) => {
    // Перевіряємо, чи категорія вибрана
    return selectedCategories.some(
      (category) => category.category_name === categoryName
    );
  };

  const handleCategoryChange = (categoryName) => {
    const selectedCategory = skinType.find(
      (category) => category.type === categoryName
    );

    if (selectedCategory) {
      const updatedSelectedCategories = [...selectedCategories];
      const index = updatedSelectedCategories.findIndex(
        (category) => category.category_name === categoryName
      );

      if (index !== -1) {
        updatedSelectedCategories.splice(index, 1);
      } else {
        updatedSelectedCategories.push({
          category_name: categoryName,
          id: selectedCategory.id,
        });
      }

      setSelectedCategories(updatedSelectedCategories);
      setSelectedSkinType(updatedSelectedCategories); // Передача унікальних об'єктів категорій
    }
  };
  useEffect(() => {
    if (selectedSkinType) {
      setSelectedCategories(selectedSkinType);
    }
  }, [selectedSkinType]);
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
          <p className={css.fForAll}>Skin Type</p>
        </div>
        {isDropdownOpen && <ReactSVG src={arrowUp} />}
        {!isDropdownOpen && <ReactSVG src={arrDo} />}
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
          {skinType.map((category, index) => (
            <div
              key={index}
              className={css.dropdownItem}
              onClick={() => handleCategoryChange(category.type)}
            >
              <div
                className={
                  isCategorySelected(category.type) ? css.kvadCheck : css.kvad
                }
              ></div>{" "}
              <p
                className={
                  isCategorySelected(category.type)
                    ? css.nameLocPCheck
                    : css.nameLocP
                }
              >
                {category.type}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SkinType;

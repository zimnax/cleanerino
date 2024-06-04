import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrowUp from "../../svg/ChevronIconApp.svg";
import arrDo from "../../svg/fdsewhj.svg";
import ingridi from "../../svg/skinConcern.svg";
import withMySQLData from "../HOK/withMySQLData";
import { useEffect, useState } from "react";
const SkinConcern = ({ selectedSkinConcer, setSelectedSkinConcer }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const skinType = [
    { id: 1, type: "Dryness" },
    { id: 2, type: "Dark circles" },
    { id: 3, type: "Eczema" },
    { id: 4, type: "Psoriasis" },
    { id: 5, type: "Dermatitis" },
    { id: 6, type: "Sunburned skin" },
    { id: 7, type: "Loss of Elasticity" },
    { id: 8, type: "Blemishes" },
    { id: 9, type: "Sensitive skin" },
    { id: 10, type: "Signs of Aging" },
    { id: 11, type: "Dark Spots" },
    { id: 12, type: "Uneven skin tone" },
    { id: 13, type: "Oiliness" },
    { id: 14, type: "Visible pores" },
    { id: 15, type: "Redness" },
    { id: 16, type: "Acne" },
    { id: 17, type: "Dullness" },
    { id: 18, type: "Damaged skin" },
    { id: 19, type: "Uneven texture" },
    { id: 20, type: "Wrinkles" },
    { id: 21, type: "Fine lines" },
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
      setSelectedSkinConcer(updatedSelectedCategories); // Передача унікальних об'єктів категорій
    }
  };
  useEffect(() => {
    if (selectedSkinConcer) {
      setSelectedCategories(selectedSkinConcer);
    }
  }, [selectedSkinConcer]);
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
          <p className={css.fForAll}>Skin Concern</p>
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
export default SkinConcern;

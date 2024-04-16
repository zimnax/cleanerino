import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrDo from "../../svg/fdsewhj.svg";
import cat from "../../svg/Categoryfil.svg";
import withMySQLData from "../HOK/withMySQLData";
import { useState } from "react";
import arrowUp from "../../svg/ChevronIconApp.svg";
const CategoryL = ({
  data,
  setSelectedCategoryIdArr,
  selectedCategoryIdArr,
}) => {
  const uniqueCategories = [...new Set(data.map((item) => item.category_name))];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleCategoryChange = (categoryName) => {
    // Знаходимо об'єкт категорії за ім'ям
    const selectedCategory = data.find(
      (category) => category.category_name === categoryName
    );

    if (selectedCategory) {
      const updatedSelectedCategories = [...selectedCategories];
      // Перевіряємо, чи категорія вже вибрана
      const index = updatedSelectedCategories.findIndex(
        (category) => category.category_name === categoryName
      );

      if (index !== -1) {
        // Видаляємо категорію, якщо вона вже була вибрана
        updatedSelectedCategories.splice(index, 1);
      } else {
        // Додаємо категорію, якщо її не було вибрано
        updatedSelectedCategories.push({
          category_name: categoryName,
          category_id: selectedCategory.category_id,
        });
      }

      // Оновлюємо стан з обраними категоріями
      setSelectedCategories(updatedSelectedCategories);

      // Передаємо вибрані категорії до батьківського компонента
      setSelectedCategoryIdArr(
        updatedSelectedCategories.map((category) => category.category_id)
      );
    }
  };

  const isCategorySelected = (categoryName) => {
    // Перевіряємо, чи категорія вибрана
    return selectedCategories.some(
      (category) => category.category_name === categoryName
    );
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
          <ReactSVG src={cat} className={css.filrersIcon} />
          <p className={css.fForAll}>Category</p>
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
          {uniqueCategories.map((category, index) => (
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
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/category`
)(CategoryL);

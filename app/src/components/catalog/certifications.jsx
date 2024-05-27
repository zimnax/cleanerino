import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrDo from "../../svg/fdsewhj.svg";
import star from "../../svg/StarCertif.svg";
import withMySQLData from "../HOK/withMySQLData";
import { useEffect, useState } from "react";
import arrowUp from "../../svg/ChevronIconApp.svg";
const Certifications = ({
  data,
  selectedCertificate,
  setSelectedCertificate,
}) => {
  const uniqueCategories = [...new Set(data.map((item) => item.name))];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleCategoryChange = (categoryName) => {
    // Знаходимо об'єкт категорії за ім'ям
    const selectedCategory = data.find(
      (category) => category.name === categoryName
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
          id: selectedCategory.id,
        });
      }

      // Оновлюємо стан з обраними категоріями
      setSelectedCategories(updatedSelectedCategories);
      console.log("updatedSelectedCategories", updatedSelectedCategories);
      // Передаємо вибрані категорії до батьківського компонента
      setSelectedCertificate(
        updatedSelectedCategories.map((category) => category.id)
      );
    }
  };

  const isCategorySelected = (categoryName) => {
    // Перевіряємо, чи категорія вибрана
    return selectedCategories.some(
      (category) => category.category_name === categoryName
    );
  };
  // useEffect(() => {
  //   // Фільтруємо категорії за вибраними ідентифікаторами
  //   const filteredCategories = data.filter((category) =>
  //     selectedCertificate.includes(category.category_id)
  //   );
  //   const uniqueCategoriesMap = filteredCategories.reduce((acc, category) => {
  //     if (!acc[category.category_id]) {
  //       acc[category.category_id] = category;
  //     }
  //     return acc;
  //   }, {});

  //   // Отримуємо масив унікальних категорій
  //   const uniqueCategories = Object.values(uniqueCategoriesMap);
  //   console.log("uniqueCategories", uniqueCategories);
  //   setSelectedCategories(uniqueCategories);
  // }, [data, selectedCertificate]);
  useEffect(() => {
    // Перевіряємо, чи selectedCertificate існує і не дорівнює порожньому рядку
    if (selectedCertificate && selectedCertificate !== "") {
      // Знаходимо об'єкти в масиві data, які мають id зі значеннями selectedCertificate
      const filteredCategories = data.filter((category) =>
        selectedCertificate.includes(category.id)
      );

      // Створюємо новий масив об'єктів з полями category_name та id
      const formattedCategories = filteredCategories.map((category) => ({
        category_name: category.name,
        id: category.id,
      }));
      console.log("formattedCategories", formattedCategories);
      // Оновлюємо стан з обраними категоріями
      setSelectedCategories(formattedCategories);
    }
  }, [data, selectedCertificate]);

  return (
    <div className={css.wrapAllFilter}>
      <div
        className={
          isDropdownOpen ? css.oneLabelFilterCheck : css.oneLabelFilter
        }
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className={css.labelWithIconWr}>
          <ReactSVG src={star} className={css.filrersIcon} />
          <p className={css.fForAll}>Certifications</p>
        </div>
        {isDropdownOpen && <ReactSVG src={arrowUp} />}
        {!isDropdownOpen && <ReactSVG src={arrDo} />}
      </div>
      {isDropdownOpen && (
        <div className={css.dropdownCert}>
          <div
            className={css.dropdownItem}
            onClick={() => setSelectedCategories([])}
          >
            <div className={css.kvad}></div>
            <p className={css.nameLocP}>All</p>
          </div>
          {data.map((category, index) => (
            <div
              key={index}
              className={css.dropdownItem}
              onClick={() => handleCategoryChange(category.name)}
            >
              {/* <div
                className={
                  isCategorySelected(category.name) ? css.kvadCheck : css.kvad
                }
              ></div> */}
              {/* <p
                className={
                  isCategorySelected(category)
                    ? css.nameLocPCheck
                    : css.nameLocP
                }
              >
                {category}
              </p> */}
              <img
                className={
                  isCategorySelected(category.name)
                    ? css.certificationImageCheck
                    : css.certificationImage
                }
                src={category.image}
                alt="certification"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
)(Certifications);

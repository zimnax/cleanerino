import css from "../../../../vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../../../../../svg/chevron.svg";
import withMySQLData from "../../../../../HOK/withMySQLData";
import { useState } from "react";
const ProdCategory = ({
  data,
  setSelectedCategoryId,
  setSelectedTypeId,
  prodCatError,
  prodTypeError,
  setProdCatError,
  setProdTypeError,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Фільтруємо унікальні категорії
  const uniqueCategories = [...new Set(data.map((item) => item.category_name))];

  // Фільтруємо типи за вибраною категорією
  const filteredTypes = data.filter(
    (item) => item.category_name === selectedCategory
  );

  // Отримуємо унікальні типи для вибраної категорії
  const uniqueTypes = [...new Set(filteredTypes.map((item) => item.type_name))];

  // Обробники подій вибору категорії та типу
  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;

    // Знаходимо об'єкт категорії за ім'ям
    const selectedCategory = data.find(
      (category) => category.category_name === selectedCategoryName
    );

    // Перевіряємо, чи знайдено категорію
    if (selectedCategory) {
      setSelectedCategory(selectedCategoryName);
      setSelectedCategoryId(selectedCategory.category_id); // Зберігаємо ID обраної категорії
      setSelectedType(""); // Скидаємо обрані типи
      setProdCatError(true);
    } else {
      // Якщо категорію не знайдено, скидаємо значення категорії і типу
      setSelectedCategory("");
      setSelectedCategoryId("");
      setSelectedType("");
    }
  };

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    const filteredType = filteredTypes.find(
      (item) => item.type_name === selectedType
    );
    if (filteredType) {
      setSelectedTypeId(filteredType.type_id); // Зберігаємо обраний type_id
      setProdTypeError(true);
    }
  };
  return (
    <>
      <div className={css.oneSmalInpBig}>
        <label className={prodCatError ? css.labelInp : css.labelInpNot}>
          Product category
        </label>
        <div className={css.wrapSelectFTwo}>
          <select
            className={
              prodCatError
                ? css.proceInputBigSelect
                : css.proceInputBigSelectNot
            }
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Select a category</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          <ReactSVG className={css.customArrowSelect} src={arrow} />
        </div>
      </div>

      <div className={css.oneSmalInpBig}>
        <label className={prodTypeError ? css.labelInp : css.labelInpNot}>
          Product type
        </label>
        <div className={css.wrapSelectFTwo}>
          <select
            className={
              prodTypeError
                ? css.proceInputBigSelect
                : css.proceInputBigSelectNot
            }
            value={selectedType}
            onChange={handleTypeChange}
            disabled={!selectedCategory}
          >
            <option value="">Select a type</option>
            {uniqueTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ReactSVG className={css.customArrowSelect} src={arrow} />
        </div>
      </div>
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/category`
)(ProdCategory);

import { useEffect, useState } from "react";
import withMySQLData from "../../../../HOK/withMySQLData";
import arrow from "../../../../../svg/VectorGreenCat.svg";
import css from "../../dashboard.module.css";
import { ReactSVG } from "react-svg";

const CategoryList = ({
  data,
  selectedCategoryId,
  setSelectedCategoryId,
  setCategoryListAll,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

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
    } else {
      // Якщо категорію не знайдено, скидаємо значення категорії і типу
      setSelectedCategory("");
      setSelectedCategoryId("");
    }
  };
  useEffect(() => {
    const uniqueCategoriesTwo = data.reduce((acc, curr) => {
      // Перевіряємо, чи категорія вже присутня у збірнику
      const existingCategory = acc.find(
        (category) => category.id === curr.category_id
      );

      // Якщо категорія ще не присутня, додаємо її до збірника
      if (!existingCategory) {
        acc.push({
          id: curr.category_id,
          name: curr.category_name,
        });
      }

      return acc;
    }, []);
    setCategoryListAll(uniqueCategoriesTwo);
  }, [data]);

  const uniqueCategories = [...new Set(data.map((item) => item.category_name))];

  return (
    <div className={css.categoryListwrap}>
      <div className={css.wrapSelectF}>
        <select
          className={css.proceInputBigSelect}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Categories</option>
          {uniqueCategories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <ReactSVG className={css.customArrowSelect} src={arrow} />
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/category`
)(CategoryList);

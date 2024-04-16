// import css from "./catalog.module.css";
// import { ReactSVG } from "react-svg";
// import arrowUp from "../../svg/ChevronIconApp.svg";
// import arrDo from "../../svg/fdsewhj.svg";
// import ingridi from "../../svg/Ingredients.svg";
// import withMySQLData from "../HOK/withMySQLData";
// import { useEffect, useState } from "react";
// const Ingridients = ({
//   data,
//   selectedIngridient,
//   setSelectedIngridient,
//   setIngridietsArrayFromB,
// }) => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const isCategorySelected = (categoryName) => {
//     // Перевіряємо, чи категорія вибрана
//     return selectedCategories.some(
//       (category) => category.category_name === categoryName
//     );
//   };
//   useEffect(() => {
//     setIngridietsArrayFromB(data);
//   }, [data]);
//   const handleCategoryChange = (categoryName) => {
//     const selectedCategory = data.find(
//       (category) => category.ingredient_name === categoryName
//     );

//     if (selectedCategory) {
//       const updatedSelectedCategories = [...selectedCategories];
//       const index = updatedSelectedCategories.findIndex(
//         (category) => category.category_name === categoryName
//       );

//       if (index !== -1) {
//         updatedSelectedCategories.splice(index, 1);
//       } else {
//         updatedSelectedCategories.push({
//           category_name: categoryName,
//           id: selectedCategory.id,
//         });
//       }
//       console.log("asdlkfjasd;lfkjasdlkfasdfasd", updatedSelectedCategories);
//       setSelectedCategories(updatedSelectedCategories);
//       setSelectedIngridient(updatedSelectedCategories); // Передача унікальних об'єктів категорій
//     }
//   };
//   return (
//     <div className={css.wrapAllFilter}>
//       <div
//         className={
//           isDropdownOpen ? css.oneLabelFilterCheck : css.oneLabelFilter
//         }
//         onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//       >
//         <div className={css.labelWithIconWr}>
//           <ReactSVG src={ingridi} className={css.filrersIcon} />
//           <p className={css.fForAll}>Ingredient Preferences</p>
//         </div>
//         {isDropdownOpen && <ReactSVG src={arrowUp} />}
//         {!isDropdownOpen && <ReactSVG src={arrDo} />}
//       </div>
//       {isDropdownOpen && (
//         <div className={css.dropdown}>
//           <div
//             className={css.dropdownItem}
//             onClick={() => setSelectedCategories([])}
//           >
//             <div className={css.kvad}></div>
//             <p className={css.nameLocP}>All</p>
//           </div>
//           {data.map((category, index) => (
//             <div
//               key={index}
//               className={css.dropdownItem}
//               onClick={() => handleCategoryChange(category.ingredient_name)}
//             >
//               <div
//                 className={
//                   isCategorySelected(category.ingredient_name)
//                     ? css.kvadCheck
//                     : css.kvad
//                 }
//               ></div>{" "}
//               <p
//                 className={
//                   isCategorySelected(category.ingredient_name)
//                     ? css.nameLocPCheck
//                     : css.nameLocP
//                 }
//               >
//                 {category.ingredient_name}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
// export default withMySQLData("http://localhost:4000/api/v1/ingridients")(
//   Ingridients
// );
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
  `${process.env.REACT_APP_API_URL}:4000/api/v1/ingridients`
)(Ingridients);

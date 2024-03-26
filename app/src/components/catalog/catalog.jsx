import Header from "../standartComponent/header";
import HeaderNormal from "../standartComponent/headerNormal";
import css from "./catalog.module.css";
import CategoryList from "../vendorAdmin/dashboard/mainDashboard/standartComponent/categoryList";
import { ReactSVG } from "react-svg";
import search from "../../svg/SearchProduct.svg";

import { useEffect, useState } from "react";
import VendorProd from "./vendorProd";
import withMySQLData from "../HOK/withMySQLData";
const Catalog = ({ data }) => {
  const [nameProduct, setNameProduct] = useState("");
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [selectedCategoryIdArr, setSelectedCategoryIdArr] = useState("");
  const [selectedCertificate, setSelectedCertificate] = useState("");
  const [selectedIngridient, setSelectedIngridient] = useState("");
  const [selectedSkinType, setSelectedSkinType] = useState("");
  const [selectedSkinConcer, setSelectedSkinConcer] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [listOfProduct, setListOfProduct] = useState(null);
  const [ingridietsArrayFromB, setIngridietsArrayFromB] = useState(null);

  const filterProducts = () => {
    if (!data || !data.products) return []; // Якщо немає даних, повертаємо пустий масив
    console.log("data.products", ingridietsArrayFromB);
    let filteredList = data.products;

    // Фільтруємо за назвою товару
    if (nameProduct.trim() !== "") {
      const searchTerm = nameProduct.toLowerCase().trim();
      filteredList = filteredList.filter((product) =>
        product.product_name.toLowerCase().includes(searchTerm)
      );
    }

    // Фільтруємо за категорією товару
    if (selectedCategoryId !== "") {
      filteredList = filteredList.filter(
        (product) => product.product_category_id === selectedCategoryId
      );
    }

    if (selectedCategoryIdArr.length > 0) {
      filteredList = filteredList.filter((product) => {
        return selectedCategoryIdArr.includes(product.product_category_id);
      });
    }
    if (selectedCertificate.length > 0) {
      filteredList = filteredList.filter((product) => {
        return product.certificates.some((certificate) => {
          return selectedCertificate.includes(certificate.certif_sub_cat);
        });
      });
    }

    // if (
    //   ingridietsArrayFromB &&
    //   ingridietsArrayFromB.length > 0 &&
    //   selectedIngridient.length > 0
    // ) {
    //   filteredList = filteredList.filter((product) => {
    //     return selectedIngridient.every((ingridient) => {
    //       console.log("category_name", ingridient);
    //       const category_name = ingridient.toLowerCase().trim();

    //       const ingredientsArray = product.ingredients
    //         .toLowerCase()
    //         .split(",")
    //         .map((ingredient) => ingredient.trim());

    //       // Перевірка, чи всі інгредієнти відповідають вибраній категорії
    //       return ingridietsArrayFromB.some((ingridientFromB) => {
    //         console.log("ingridientFromB", ingridientFromB);
    //         if (
    //           ingridientFromB.ingredient_name.toLowerCase() === category_name
    //         ) {
    //           // Якщо інгредієнт відповідає вибраній категорії, перевірте його значення в таблиці ingridients
    //           switch (category_name) {
    //             case "vegetarian":
    //               return ingridientFromB.vegetarian.toLowerCase() === "Yes";
    //             case "vegan":
    //               return ingridientFromB.vegan.toLowerCase() === "Yes";
    //             case "gluten-free":
    //               return ingridientFromB.gluten_free.toLowerCase() === "Yes";
    //             case "paleo":
    //               return ingridientFromB.paleo.toLowerCase() === "Yes";
    //             default:
    //               return true; // Якщо категорія не знайдена в таблиці, поверніть true
    //           }
    //         }
    //         return true; // Якщо інгредієнт не відповідає вибраній категорії, продовжуйте фільтрацію
    //       });
    //     });
    //   });
    // }
    if (
      ingridietsArrayFromB &&
      ingridietsArrayFromB.length > 0 &&
      selectedIngridient.length > 0
    ) {
      filteredList = filteredList.filter((product) => {
        return selectedIngridient.every((category_name) => {
          const category_name_lower = category_name.toLowerCase().trim();

          // Перевіряємо, чи всі інгредієнти відповідають вибраній категорії
          const ingredientsArray = product.ingredients
            .toLowerCase()
            .split(",")
            .map((ingredient) => ingredient.trim());

          const ingridientsMatched = ingredientsArray.some((ingredient) => {
            return ingridietsArrayFromB.some((ingridientFromB) => {
              if (
                ingridientFromB.ingredient_name.toLowerCase() === ingredient
              ) {
                // Перевіряємо, чи значення відповідного інгредієнту в таблиці є "Yes"
                switch (category_name_lower) {
                  case "vegetarian":
                    return ingridientFromB.vegetarian.toLowerCase() === "yes";
                  case "vegan":
                    return ingridientFromB.vegan.toLowerCase() === "yes";
                  case "gluten-free":
                    return ingridientFromB.gluten_free.toLowerCase() === "yes";
                  case "paleo":
                    return ingridientFromB.paleo.toLowerCase() === "yes";
                  default:
                    return false; // Якщо категорія не знайдена в таблиці, повертаємо false
                }
              }
              return false; // Якщо інгредієнт не відповідає вибраній категорії, продовжуємо фільтрацію
            });
          });

          return ingridientsMatched;
        });
      });
    }
    if (
      ingridietsArrayFromB &&
      ingridietsArrayFromB.length > 0 &&
      selectedSkinType.length > 0
    ) {
      filteredList = filteredList.filter((product) => {
        return ingridietsArrayFromB.some((ingridient) => {
          const { ingredient_name, skin_type } = ingridient;
          const ingredientNameLowerCase = ingredient_name.toLowerCase().trim();

          const ingredientsArray = product.ingredients
            .toLowerCase()
            .split(",")
            .map((ingredient) => ingredient.trim());

          const hasIngredient = ingredientsArray.some((ingredient) =>
            ingredient.includes(ingredientNameLowerCase)
          );

          const skinTypesArray = selectedSkinType.map((skin) =>
            skin.category_name.toLowerCase().trim()
          );
          const productSkinTypes = skin_type
            .split(",")
            .map((type) => type.trim());
          const hasSkinType = productSkinTypes.some((type) =>
            skinTypesArray.includes(type.toLowerCase())
          );

          return hasIngredient && hasSkinType;
        });
      });
    }
    if (
      ingridietsArrayFromB &&
      ingridietsArrayFromB.length > 0 &&
      selectedSkinConcer.length > 0
    ) {
      filteredList = filteredList.filter((product) => {
        return ingridietsArrayFromB.some((ingridient) => {
          const { ingredient_name, skin_concern } = ingridient;
          const ingredientNameLowerCase = ingredient_name.toLowerCase().trim();

          const ingredientsArray = product.ingredients
            .toLowerCase()
            .split(",")
            .map((ingredient) => ingredient.trim());

          const hasIngredient = ingredientsArray.some((ingredient) =>
            ingredient.includes(ingredientNameLowerCase)
          );

          const skinTypesArray = selectedSkinConcer.map((skin) =>
            skin.category_name.toLowerCase().trim()
          );
          const productSkinTypes = skin_concern
            .split(",")
            .map((type) => type.trim());
          const hasSkinType = productSkinTypes.some((type) =>
            skinTypesArray.includes(type.toLowerCase())
          );

          return hasIngredient && hasSkinType;
        });
      });
    }
    return filteredList;
  };

  useEffect(() => {
    // Встановлюємо відфільтрований список товарів
    setListOfProduct(filterProducts());
  }, [
    data,
    nameProduct,
    selectedCategoryId,
    selectedCategoryIdArr,
    selectedCertificate,
    selectedIngridient,
    selectedSkinType,
    selectedSkinConcer,
  ]);

  return (
    <>
      <HeaderNormal />
      <div className={css.wrapAllCatalog}>
        <div className={css.wrapSearch}>
          <CategoryList
            setSelectedCategoryId={setSelectedCategoryId}
            selectedCategoryId={selectedCategoryId}
            setCategoryListAll={setCategoryListAll}
          />
          <div className={css.wrapInput}>
            <ReactSVG src={search} className={css.searchICon} />
            <input
              className={css.inputSearchProd}
              value={nameProduct}
              onChange={(e) => setNameProduct(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
        <VendorProd
          listOfProduct={listOfProduct}
          nameProduct={nameProduct}
          setSelectedCategoryIdArr={setSelectedCategoryIdArr}
          selectedCategoryIdArr={selectedCategoryIdArr}
          selectedCertificate={selectedCertificate}
          setSelectedCertificate={setSelectedCertificate}
          selectedIngridient={selectedIngridient}
          setSelectedIngridient={setSelectedIngridient}
          selectedSkinType={selectedSkinType}
          setSelectedSkinType={setSelectedSkinType}
          ingridietsArrayFromB={ingridietsArrayFromB}
          setIngridietsArrayFromB={setIngridietsArrayFromB}
          selectedSkinConcer={selectedSkinConcer}
          setSelectedSkinConcer={setSelectedSkinConcer}
        />
      </div>
    </>
  );
};
export default withMySQLData("http://localhost:4000/api/v1/vendor/product/add")(
  Catalog
);

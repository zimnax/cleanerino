import Header from "../standartComponent/header";
import HeaderNormal from "../standartComponent/headerNormal";
import css from "./catalog.module.css";
import CategoryList from "../vendorAdmin/dashboard/mainDashboard/standartComponent/categoryList";
import { ReactSVG } from "react-svg";
import search from "../../svg/SearchProduct.svg";
import { useSelector, useDispatch } from "react-redux";
import { setText } from "../../function/textSlice";
import { useEffect, useState } from "react";
import VendorProd from "./vendorProd";
import withMySQLData from "../HOK/withMySQLData";
import HeaderModernWhite from "../standartComponent/headerModernWhite";
import HeaderModernWhiteCatalog from "../standartComponent/HeaderModernWhiteCatalog";
import Footer from "../standartComponent/footer";
const Catalog = ({ data, activeUser, totalQuantity, setCartCounterC }) => {
  const dispatch = useDispatch();
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
  const [alergens, setAlergens] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const text = useSelector((state) => state.textSlice);
  const [savedAllFilter, setSavedAllFilter] = useState(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    return savedFilters ? true : false;
  });

  useEffect(() => {
    setNameProduct(text);
  }, [text]);

  useEffect(() => {
    loadFiltersFromLocalStorage();
  }, []);
  const saveDataToLocal = () => {
    const filters = {
      selectedCategoryIdArr,
      selectedCertificate,
      selectedIngridient,
      selectedSkinType,
      selectedSkinConcer,
      selectedCategoryId,
      alergens,
      selectedOption,
      nameProduct,
    };

    localStorage.setItem("filters", JSON.stringify(filters));
  };
  // useEffect(() => {
  //   console.log("3");
  //   if (savedAllFilter) {
  //     console.log("4");
  //     const filters = {
  //       selectedCategoryIdArr,
  //       selectedCertificate,
  //       selectedIngridient,
  //       selectedSkinType,
  //       selectedSkinConcer,
  //       selectedCategoryId,
  //       alergens,
  //       selectedOption,
  //       nameProduct,
  //     };
  //     console.log("savedAllFilterfilters", filters);
  //     localStorage.setItem("filters", JSON.stringify(filters));
  //   } else {
  //     console.log("5");
  //     console.log("Remove", savedAllFilter);
  //     localStorage.removeItem("filters");
  //   }
  // }, [
  //   savedAllFilter,
  //   selectedCategoryIdArr,
  //   selectedCertificate,
  //   selectedIngridient,
  //   selectedSkinType,
  //   selectedSkinConcer,
  //   selectedCategoryId,
  //   alergens,
  //   selectedOption,
  //   nameProduct,
  // ]);

  // const loadFiltersFromLocalStorage = () => {
  //   const savedFilters = JSON.parse(localStorage.getItem("filters"));

  //   if (savedFilters) {
  //     setSelectedCategoryIdArr(savedFilters.selectedCategoryIdArr);
  //     setSelectedCertificate(savedFilters.selectedCertificate);
  //     setSelectedIngridient(savedFilters.selectedIngridient);
  //     setSelectedSkinType(savedFilters.selectedSkinType);
  //     setSelectedSkinConcer(savedFilters.selectedSkinConcer);
  //     setSelectedCategoryId(savedFilters.selectedCategoryId);
  //     setAlergens(savedFilters.alergens);
  //     setSelectedOption(savedFilters.selectedOption);
  //     setNameProduct(savedFilters.nameProduct);
  //     dispatch(setText(savedFilters.nameProduct));
  //     setSavedAllFilter(true); // There are filters in localStorage
  //   } else {
  //     setSavedAllFilter(false); // No filters in localStorage
  //   }
  // };
  const loadFiltersFromLocalStorage = () => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));

    if (savedFilters) {
      if (savedFilters.selectedCategoryIdArr) {
        setSelectedCategoryIdArr(savedFilters.selectedCategoryIdArr);
      }
      if (savedFilters.selectedCertificate) {
        setSelectedCertificate(savedFilters.selectedCertificate);
      }
      if (savedFilters.selectedIngridient) {
        setSelectedIngridient(savedFilters.selectedIngridient);
      }
      if (savedFilters.selectedSkinType) {
        setSelectedSkinType(savedFilters.selectedSkinType);
      }
      if (savedFilters.selectedSkinConcer) {
        setSelectedSkinConcer(savedFilters.selectedSkinConcer);
      }
      if (savedFilters.selectedCategoryId) {
        setSelectedCategoryId(savedFilters.selectedCategoryId);
      }
      if (savedFilters.alergens) {
        setAlergens(savedFilters.alergens);
      }
      if (savedFilters.selectedOption) {
        setSelectedOption(savedFilters.selectedOption);
      }
      if (savedFilters.nameProduct) {
        setNameProduct(savedFilters.nameProduct);
        dispatch(setText(savedFilters.nameProduct));
      }
      setSavedAllFilter(true); // There are filters in localStorage
    } else {
      setSavedAllFilter(false); // No filters in localStorage
    }
  };
  // const loadFiltersFromLocalStorage = () => {
  //   const savedFilters = JSON.parse(localStorage.getItem("filters"));
  //   console.log("savedFilters", savedFilters);
  //   if (savedFilters) {
  //     console.log("Зайшло");
  //     setSelectedCategoryIdArr(savedFilters.selectedCategoryIdArr);
  //     setSelectedCertificate(savedFilters.selectedCertificate);
  //     setSelectedIngridient(savedFilters.selectedIngridient);
  //     setSelectedSkinType(savedFilters.selectedSkinType);
  //     setSelectedSkinConcer(savedFilters.selectedSkinConcer);
  //     setSelectedCategoryId(savedFilters.selectedCategoryId);
  //     setAlergens(savedFilters.alergens);
  //     setSelectedOption(savedFilters.selectedOption);
  //     setNameProduct(savedFilters.nameProduct);
  //     dispatch(setText(savedFilters.nameProduct));
  //     setSavedAllFilter(true); // There are filters in localStorage
  //   } else {
  //     setSavedAllFilter(false); // No filters in localStorage
  //   }
  // };
  // useEffect(() => {
  //   loadFiltersFromLocalStorage();
  // }, []);
  // useEffect(() => {
  //   if (savedAllFilter) {
  //     const filters = {
  //       selectedCategoryIdArr,
  //       selectedCertificate,
  //       selectedIngridient,
  //       selectedSkinType,
  //       selectedSkinConcer,
  //       selectedCategoryId,
  //       alergens,
  //       selectedOption,
  //       nameProduct,
  //     };
  //     console.log("savedAllFilter", savedAllFilter);
  //     localStorage.setItem("filters", JSON.stringify(filters));
  //   } else {
  //     console.log("Remove", savedAllFilter);
  //     localStorage.removeItem("filters");
  //   }
  // }, [
  //   savedAllFilter,
  //   selectedCategoryIdArr,
  //   selectedCertificate,
  //   selectedIngridient,
  //   selectedSkinType,
  //   selectedSkinConcer,
  //   selectedCategoryId,
  //   alergens,
  //   selectedOption,
  //   nameProduct,
  // ]);
  const filterProducts = () => {
    if (!data || !data.products) return []; // Якщо немає даних, повертаємо пустий масив

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

    if (
      ingridietsArrayFromB &&
      ingridietsArrayFromB.length > 0 &&
      selectedIngridient.length > 0
    ) {
      filteredList = filteredList.filter((product) => {
        return selectedIngridient.every((category_name) => {
          const category_name_lower = category_name.toLowerCase().trim();

          const ingredientsArray = product.ingredients
            .toLowerCase()
            .split(",")
            .map((ingredient) => ingredient.trim());

          const ingridientsMatched = ingredientsArray.some((ingredient) => {
            return ingridietsArrayFromB.some((ingridientFromB) => {
              if (
                ingridientFromB.ingredient_name.toLowerCase() === ingredient
              ) {
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
                    return false;
                }
              }
              return false;
            });
          });

          return ingridientsMatched;
        });
      });
    }
    if (
      ingridietsArrayFromB &&
      ingridietsArrayFromB.length > 0 &&
      alergens &&
      alergens.length > 0
    ) {
      filteredList = filteredList.filter((product) => {
        return alergens.every((category_name) => {
          const category_name_lower = category_name.toLowerCase().trim();

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
                  case "nut-free":
                    return ingridientFromB.nut_free.toLowerCase() === "yes";
                  case "soy-free":
                    return ingridientFromB.soy_free.toLowerCase() === "yes";
                  case "latex-free":
                    return ingridientFromB.latex_free.toLowerCase() === "yes";
                  case "sesame-free":
                    return ingridientFromB.sesame_free.toLowerCase() === "yes";
                  case "citrus-free":
                    return ingridientFromB.citrus_free.toLowerCase() === "yes";
                  case "dye-free":
                    return ingridientFromB.dye_free.toLowerCase() === "yes";
                  case "fragrance-free":
                    return (
                      ingridientFromB.fragrance_free.toLowerCase() === "yes"
                    );
                  case "scent-free":
                    return ingridientFromB.scent_free.toLowerCase() === "yes";
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
    if (selectedOption === "Local pick-up") {
      filteredList = filteredList.filter(
        (product) => product.local_pickup === "true"
      );
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
    alergens,
    selectedOption,
  ]);

  const changeSearchParams = (e) => {
    setNameProduct(e.target.value);
    dispatch(setText(e.target.value));
  };
  return (
    <>
      <HeaderModernWhiteCatalog
        activeUser={activeUser}
        totalQuantity={totalQuantity}
      />
      <div className={css.wrapAllCatalog}>
        {/* <div className={css.wrapSearch}>
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
              onChange={changeSearchParams}
              placeholder="Search..."
            />
          </div>
        </div> */}
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
          setAlergens={setAlergens}
          alergens={alergens}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setListOfProduct={setListOfProduct}
          setCartCounterC={setCartCounterC}
          setSavedAllFilter={setSavedAllFilter}
          savedAllFilter={savedAllFilter}
          saveDataToLocal={saveDataToLocal}
        />
      </div>
      <Footer />
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add`
)(Catalog);

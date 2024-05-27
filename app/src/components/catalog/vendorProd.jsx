import LeftPanel from "./leftPanel";
import RightPanel from "./rightPanel";
import css from "./catalog.module.css";

const VendorProd = ({
  listOfProduct,
  nameProduct,
  setSelectedCategoryIdArr,
  selectedCategoryIdArr,
  selectedCertificate,
  setSelectedCertificate,
  selectedIngridient,
  setSelectedIngridient,
  selectedSkinType,
  setSelectedSkinType,
  ingridietsArrayFromB,
  setIngridietsArrayFromB,
  selectedSkinConcer,
  setSelectedSkinConcer,
  setAlergens,
  selectedOption,
  setSelectedOption,
  setListOfProduct,
  setCartCounterC,
  setSavedAllFilter,
  savedAllFilter,
  saveDataToLocal,
  alergens,
}) => {
  return (
    <div className={css.wrapFilterWithProd}>
      <LeftPanel
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
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setListOfProduct={setListOfProduct}
        listOfProduct={listOfProduct}
        setSavedAllFilter={setSavedAllFilter}
        savedAllFilter={savedAllFilter}
        saveDataToLocal={saveDataToLocal}
        alergens={alergens}
      />
      <RightPanel
        listOfProduct={listOfProduct}
        nameProduct={nameProduct}
        setCartCounterC={setCartCounterC}
      />
    </div>
  );
};
export default VendorProd;

import { ReactSVG } from "react-svg";
import css from "../../dashboard.module.css";
import fold from "../../../../../svg/Folder.svg";
import addProdS from "../../../../../svg/AddProdList.svg";
import CategoryList from "./categoryList";
import { useState } from "react";
import search from "../../../../../svg/SearchProduct.svg";
import cancelPro from "../../../../../svg/CancelProduct.svg";
import image from "../../../../../img/ifdsdf.png";
import done from "../../../../../svg/Done.svg";
import withMySQLData from "../../../../HOK/withMySQLData";
import axios from "axios";
import AddProductDashboard from "./addProductDashboard";
import ChangeProduct from "./changeProduct/changeProduct";

const ProductList = ({ data, users, setProduct }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [prodList, setProdList] = useState(true);
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [changeProduct, setChangeProduct] = useState(false);
  const [productForChange, setProductForChange] = useState(null);
  const [nameProduct, setNameProduct] = useState("");

  const handleCheckboxChange = (productId) => {
    setCheckedItems((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId], // Toggle the state
    }));
  };

  const deleteProduct = async () => {
    try {
      const productIdsToDelete = Object.keys(checkedItems)
        .map(Number)
        .filter((productId) => checkedItems[productId]);

      for (const productId of productIdsToDelete) {
        console.log("produForCHang", data);
        console.log("productId", productId);
        await axios.post(
          `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/add/${productId}`
        );
      }

      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const addProductInDash = () => {
    setProdList(false);
    setAddProduct(true);
    setChangeProduct(false);
  };

  const changeProdFinal = () => {
    setProdList(true);
    setAddProduct(false);
    setChangeProduct(false);
  };

  const editProduct = (id) => {
    const product = data.products.find((product) => product.id === id);

    setProductForChange(product);
    setProdList(false);
    setAddProduct(false);
    setChangeProduct(true);
  };

  return (
    <>
      {prodList && (
        <div className={css.productListWrap}>
          <div className={css.wrapName}>
            <p className={css.pMainInList}>Products</p>
            <div className={css.wrapButtonPList}>
              <div className={css.buttonUpload}>
                <ReactSVG src={fold} />
                <span className={css.spanButUpload}>Bulk upload</span>
              </div>
              <div
                className={css.buttonUploadSecond}
                onClick={addProductInDash}
              >
                <ReactSVG src={addProdS} />
                <span className={css.spanButUploadWhite}>Add Product</span>
              </div>
            </div>
          </div>
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
              <ReactSVG
                src={cancelPro}
                className={css.canselSearchText}
                onClick={() => setNameProduct("")}
              />
            </div>
          </div>
          <div className={css.wrapProductWithButton}>
            <button className={css.deleteProduct} onClick={deleteProduct}>
              Delete
            </button>
            <div className={css.wrapProdTable}>
              <div className={css.allForDashProductWrap}>
                <table className={css.table}>
                  <thead>
                    <tr className={css.mainTr}>
                      <th className={css.thClassTwoBDash}>Item name</th>
                      <th className={css.thClass}>Date</th>
                      <th className={css.thClass}>Price</th>
                      <th className={css.thClass}>In Stock</th>
                      <th className={css.thClass}>Category</th>
                      <th className={css.thClass}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.products &&
                      data.products
                        .filter((product) =>
                          selectedCategoryId
                            ? product.product_category_id === selectedCategoryId
                            : true
                        )
                        .filter((product) =>
                          nameProduct
                            ? product.product_name
                                .toLowerCase()
                                .includes(nameProduct.toLowerCase())
                            : true
                        )
                        .filter((product) => product.vendorId === users.id)
                        .map((el, index) => {
                          const categoryName = categoryListAll.find(
                            (category) => category.id === el.product_category_id
                          )?.name;
                          console.log("el", el);
                          return (
                            <tr className={css.secondTr} key={index}>
                              <td className={css.tdClassFirstProd}>
                                <label className={css.checkBoxSt}>
                                  <input
                                    type="checkbox"
                                    checked={checkedItems[el.id] || false}
                                    onChange={() => handleCheckboxChange(el.id)}
                                    style={{
                                      marginRight: "5px",
                                      appearance: "none",
                                    }}
                                  />
                                  <div
                                    className={
                                      checkedItems[el.id]
                                        ? css.boxStyleChecked
                                        : css.boxStyle
                                    }
                                  >
                                    {checkedItems[el.id] && (
                                      <ReactSVG src={done} />
                                    )}
                                  </div>
                                </label>
                                {el.files.length > 0 &&
                                  (el.files[0].type === "photo" ? (
                                    <img
                                      className={css.imageInStat}
                                      src={el.files[0].file}
                                    />
                                  ) : (
                                    <video
                                      className={css.imageInStat}
                                      src={el.files[0].file}
                                      controls
                                    />
                                  ))}
                                {el.product_name}
                              </td>
                              <td className={css.tdClassProd}>22/01/24</td>
                              <td className={css.tdClassProd}>
                                $
                                {el.dimensions.length > 0 &&
                                  el.dimensions[0].price}
                              </td>
                              <td className={css.tdClassProd}>{el.quantity}</td>
                              <td className={css.tdClassProd}>
                                {categoryName}
                              </td>
                              <td className={css.tdClassLastEdit}>
                                <div
                                  className={css.actionEdit}
                                  onClick={() => editProduct(el.id)}
                                >
                                  Edit
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {addProduct && (
        <AddProductDashboard
          setProdList={setProdList}
          setAddProduct={setAddProduct}
          users={users}
        />
      )}
      {changeProduct && (
        <ChangeProduct
          productForChange={productForChange}
          setProductForChange={setProductForChange}
          setChangeProduct={setChangeProduct}
          changeProdFinal={changeProdFinal}
        />
      )}
    </>
  );
};

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/add`
)(ProductList);

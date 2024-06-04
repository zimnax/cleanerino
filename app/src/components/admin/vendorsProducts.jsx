import css from "./vendorProductSt.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import fold from "../../svg/Folder.svg";
import addProdS from "../../svg/AddProdList.svg";
import { ReactSVG } from "react-svg";
import search from "../../svg/SearchProduct.svg";
import cancelPro from "../../svg/CancelProduct.svg";
import image from "../../img/ifdsdf.png";
import done from "../../svg/Done.svg";
import actionSvgButton from "../../svg/actionButtonSvg.svg";
import withMySQLData from "../HOK/withMySQLData";
import PopUoForProdListVendor from "./popUoForProdListVendor";
import VendorIconInProduct from "./vendorIconInProduct";
const VendorsProducts = ({ data }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [prodList, setProdList] = useState(true);
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [changeProduct, setChangeProduct] = useState(false);
  const [productForChange, setProductForChange] = useState(null);
  const [nameProduct, setNameProduct] = useState("");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const navigete = useNavigate();

  const activeButtonRefs = useRef([]);
  const popUpRef = useRef(null);
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
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/current/${id}`
        );
        setProducts(response.data.products);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchVendors = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
        );

        setVendors(response.data.vendors);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };

    fetchProducts();
    fetchVendors();
  }, [id]);

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
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add/${productId}`
        );
      }

      setCheckedItems({});
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleActiveButtonClick = (vendor, index) => {
    const buttonRef = activeButtonRefs.current[index];
    if (!buttonRef || typeof buttonRef.getBoundingClientRect !== "function") {
      console.error("Invalid buttonRef:", buttonRef);
      return;
    }

    if (selectedVendor && selectedVendor.id === vendor.id) {
      setSelectedVendor(null); // Закрити попап, якщо той самий елемент був натиснутий повторно
    } else if (buttonRef) {
      const rect = buttonRef.getBoundingClientRect();
      setPopupPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX - 150,
      });
      setSelectedVendor(vendor);
    }
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setSelectedVendor(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  const updateOrderStatusLabel = async (productId, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add/${productId}`,
        { status: newStatus }
      );
      // Оновлення стану компоненти після успішного оновлення статусу
      const updatedOrders = products.map((order) =>
        order.id === productId ? { ...order, status: newStatus } : order
      );

      setProducts(updatedOrders);
    } catch (error) {
      console.error("Помилка при оновленні статусу замовлення:", error);
    }
  };

  const editProduct = (id) => {};
  return (
    <>
      {prodList && (
        <div className={css.productListWrap}>
          <div className={css.wrapName}>
            <VendorIconInProduct id={id} />
          </div>
          <div className={css.wrapSearch}>
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
          <div className={css.wrapProductWithButton}>
            {/* <button className={css.deleteProduct} onClick={deleteProduct}>
              Delete
            </button> */}
            <div className={css.wrapProdTable}>
              <div className={css.allForDashProductWrap}>
                <table className={css.tableProd}>
                  <thead>
                    <tr className={css.mainTr}>
                      <th className={css.thClass}>Item name</th>
                      <th className={css.thClass}>Status</th>
                      <th className={css.thClass}>Date</th>
                      <th className={css.thClass}>Price</th>
                      <th className={css.thClass}>In Stock</th>
                      <th className={css.thClass}>Category</th>
                      <th className={css.thClass}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products
                        .filter((product) =>
                          nameProduct
                            ? product.product_name
                                .toLowerCase()
                                .includes(nameProduct.toLowerCase())
                            : true
                        )

                        .map((el, index) => {
                          const categoryName = categoryListAll.find(
                            (category) => category.id === el.product_category_id
                          )?.name;
                          const dateObj = new Date(el.date);
                          const day = dateObj
                            .getDate()
                            .toString()
                            .padStart(2, "0");
                          const month = (dateObj.getMonth() + 1)
                            .toString()
                            .padStart(2, "0");
                          const year = dateObj
                            .getFullYear()
                            .toString()
                            .slice(-2);
                          const formattedDate = `${day}.${month}.${year}`;

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
                              <td className={css.tdClassProd}>
                                {el.status === "waiting" && (
                                  <div className={css.productStatusWait}>
                                    Approval pending
                                  </div>
                                )}
                                {el.status === "listed" && (
                                  <div className={css.productStatusListed}>
                                    Listed
                                  </div>
                                )}
                                {el.status === "notaccepted" && (
                                  <div className={css.wrapTextPopUpDeactive}>
                                    Not accepted
                                  </div>
                                )}
                              </td>
                              <td className={css.tdClassProd}>
                                {formattedDate}
                              </td>
                              <td className={css.tdClassProd}>
                                $
                                {el.dimensions.length > 0 &&
                                  el.dimensions[0].price}
                              </td>
                              <td className={css.tdClassProd}>{el.quantity}</td>
                              <td className={css.tdClassProd}>
                                {categoryName}
                              </td>
                              <td className={css.tdClassProd}>
                                <div
                                  className={css.actionEdit}
                                  onClick={() => editProduct(el.id)}
                                >
                                  Edit
                                </div>

                                <div
                                  className={css.activeButtonWrapper}
                                  ref={(el) =>
                                    (activeButtonRefs.current[index] = el)
                                  }
                                >
                                  <ReactSVG
                                    src={actionSvgButton}
                                    className={css.activeButton}
                                    onClick={() =>
                                      handleActiveButtonClick(el, index)
                                    }
                                  />
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
      {selectedVendor && (
        <PopUoForProdListVendor
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          popUpRef={popUpRef}
          setVendors={setVendors}
          updateOrderStatusLabel={updateOrderStatusLabel}
        />
      )}
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/category`
)(VendorsProducts);

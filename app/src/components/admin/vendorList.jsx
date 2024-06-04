import { ReactSVG } from "react-svg";
import css from "./admin.module.css";
import fold from "../../svg/Folder.svg";
import addProdS from "../../svg/AddProdList.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import search from "../../svg/SearchProduct.svg";
import cancelPro from "../../svg/CancelProduct.svg";
import arrowProdUp from "../../svg/arrowInPAdm.svg";
import done from "../../svg/Done.svg";
import withMySQLData from "../../components/HOK/withMySQLData";
import axios from "axios";
import activeButton from "../../svg/actionButtonSvg.svg";
import PopUpInVend from "./popUpInVend";

const VendorList = ({ data, setAdmProdList, setVendors }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [prodList, setProdList] = useState(true);
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [changeProduct, setChangeProduct] = useState(false);
  const [productForChange, setProductForChange] = useState(null);
  const [nameProduct, setNameProduct] = useState("");
  const [vendorList, setVendorList] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const navigete = useNavigate();

  const activeButtonRefs = useRef([]);
  const popUpRef = useRef(null);

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

  useEffect(() => {
    setVendorList(data);
  }, [data]);

  const updateOrderStatusLabel = async (vendorId, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${vendorId}`,
        { active: newStatus }
      );
      // Оновлення стану компоненти після успішного оновлення статусу
      const updatedOrders = vendorList.map((order) =>
        order.id === vendorId ? { ...order, active: newStatus } : order
      );

      setVendorList(updatedOrders);
    } catch (error) {
      console.error("Помилка при оновленні статусу замовлення:", error);
    }
  };

  return (
    <>
      {prodList && (
        <div className={css.productListWrap}>
          <div className={css.wrapName}>
            <p className={css.pMainInList}>Vendors</p>
            {/* <div className={css.wrapButtonPList}>
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
            </div> */}
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
              {/* <ReactSVG
                src={cancelPro}
                className={css.canselSearchText}
                onClick={() => setNameProduct("")}
              /> */}
            </div>
          </div>
          <div className={css.wrapProductWithButton}>
            {/* <button className={css.deleteProduct} onClick={deleteProduct}>
              Delete
            </button> */}
            <div className={css.wrapProdTable}>
              <div className={css.allForDashProductWrap}>
                <table className={css.tableVendor}>
                  <thead>
                    <tr className={css.mainTrVen}>
                      <th className={css.thClassVendor}>Registration date</th>
                      <th className={css.thClassVendor}>Name user</th>
                      <th className={css.thClassVendor}>Brand name</th>

                      <th className={css.thClassVendor}>Status</th>
                      <th className={css.thClassVendor}>Products</th>
                      <th className={css.thClassVendor}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorList &&
                      vendorList
                        .filter((user) =>
                          user.first_name
                            .toLowerCase()
                            .includes(nameProduct.toLowerCase())
                        )
                        .map((el, index) => {
                          const dateObj = new Date(el.registration_date);
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
                            <>
                              <tr className={css.secondTr} key={index}>
                                <td className={css.tdClassProdVendor}>
                                  {formattedDate}
                                </td>
                                <td className={css.tdClassProdPhoto}>
                                  {el.photo && (
                                    <img
                                      className={css.imageInStat}
                                      src={el.photo}
                                    />
                                  )}
                                  {el.first_name}
                                </td>
                                <td className={css.tdClassProdPhoto}>
                                  {el.photo && (
                                    <img
                                      className={css.imageInStat}
                                      src={el.logo}
                                    />
                                  )}
                                  {el.brand_name}
                                </td>

                                <td className={css.tdClassProd}>
                                  {el.active === "paused" && (
                                    <div className={css.wrapStatusPaused}>
                                      Paused/ On hold
                                    </div>
                                  )}
                                  {el.active === "active" && (
                                    <div className={css.wrapStatusActive}>
                                      Active
                                    </div>
                                  )}
                                  {el.active === "deactivated" && (
                                    <div className={css.wrapStatusDeactivated}>
                                      Deactivated
                                    </div>
                                  )}
                                </td>
                                <td className={css.tdClassProd}>
                                  <div
                                    className={css.viewProdInAdm}
                                    onClick={() =>
                                      navigete(
                                        `/admin/vendors/product/${el.id}`
                                      )
                                    }
                                  >
                                    View
                                    <ReactSVG src={arrowProdUp} />
                                  </div>
                                </td>
                                <td className={css.tdClassProdVendor}>
                                  <div
                                    className={css.activeButtonWrapper}
                                    ref={(el) =>
                                      (activeButtonRefs.current[index] = el)
                                    }
                                  >
                                    <ReactSVG
                                      src={activeButton}
                                      className={css.activeButton}
                                      onClick={() =>
                                        handleActiveButtonClick(el, index)
                                      }
                                    />
                                  </div>
                                </td>
                              </tr>
                              <div className={css.lineInCustomers}></div>
                            </>
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
        <PopUpInVend
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
          style={{ top: popupPosition.top, left: popupPosition.left }}
          popUpRef={popUpRef}
          updateOrderStatusLabel={updateOrderStatusLabel}
          setVendors={setVendors}
          setAdmProdList={setAdmProdList}
        />
      )}
    </>
  );
};

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
)(VendorList);

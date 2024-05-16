import { ReactSVG } from "react-svg";
import css from "./admin.module.css";
import fold from "../../svg/Folder.svg";
import addProdS from "../../svg/AddProdList.svg";

import { useState } from "react";
import search from "../../svg/SearchProduct.svg";
import cancelPro from "../../svg/CancelProduct.svg";

import done from "../../svg/Done.svg";
import withMySQLData from "../../components/HOK/withMySQLData";
import axios from "axios";

const UserList = ({ data }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [addProduct, setAddProduct] = useState(false);
  const [prodList, setProdList] = useState(true);
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const [changeProduct, setChangeProduct] = useState(false);
  const [productForChange, setProductForChange] = useState(null);
  const [nameProduct, setNameProduct] = useState("");

  return (
    <>
      {prodList && (
        <div className={css.productListWrap}>
          <div className={css.wrapName}>
            <p className={css.pMainInList}>Customers</p>
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
                <table className={css.table}>
                  <thead>
                    <tr className={css.mainTr}>
                      <th className={css.thClassTwoBDash}>User ID</th>
                      <th className={css.thClass}>Name user</th>
                      <th className={css.thClass}>Registration date</th>
                      <th className={css.thClass}>Purchases</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.users &&
                      data.users
                        .filter((user) =>
                          user.user_name
                            .toLowerCase()
                            .includes(nameProduct.toLowerCase())
                        )
                        .map((el, index) => {
                          const dateObj = new Date(el.created_at);
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
                                <td className={css.tdClassFirstProd}>
                                  {el.id}
                                </td>
                                <td className={css.tdClassProdPhoto}>
                                  {el.photo && (
                                    <img
                                      className={css.imageInStat}
                                      src={el.photo}
                                    />
                                  )}
                                  {el.user_name}
                                </td>
                                <td className={css.tdClassProd}>
                                  {formattedDate}
                                </td>
                                <td className={css.tdClassProd}>0</td>
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
    </>
  );
};

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(UserList);

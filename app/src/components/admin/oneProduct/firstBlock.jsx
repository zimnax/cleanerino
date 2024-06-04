import css from "./product.module.css";
import arrowL from "../../../svg/leftArrow.svg";
import { ReactSVG } from "react-svg";
import PictureBlock from "./pictureBlock";
import eco from "../../../svg/eco.svg";
import safe from "../../../svg/safe.svg";
import gmo from "../../../svg/gmo.svg";
import crue from "../../../svg/grue.svg";
import NearPicture from "./nearPicture";
import { useState } from "react";
import axios from "axios";
import PopUoForProdListVendor from "./popUoForProdListVendor";
const FirstBlock = ({
  productData,
  brand,
  setBrand,
  setCartCounterC,
  setProductData,
}) => {
  const [popUp, setPopUp] = useState(false);
  const closePop = () => {
    setPopUp(!popUp);
  };
  const updateOrderStatusLabel = async (productId, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add/${productId}`,
        { status: newStatus }
      );
      // Оновлення стану компоненти після успішного оновлення статусу
      if (productData.id === productId) {
        const updatedOrder = { ...productData, status: newStatus };
        setProductData(updatedOrder);
      }
    } catch (error) {
      console.error("Помилка при оновленні статусу замовлення:", error);
    }
  };

  return (
    <div className={css.wrapFirstBlock}>
      <div className={css.smallWrap}>
        <div className={css.wrapLinkMain}>
          <div className={css.wrapStatusWithName}>
            <p className={css.nameProdWiLink}>{productData.product_name}</p>
            {productData.status === "waiting" && (
              <div className={css.productStatusWait}>Approval pending</div>
            )}
            {productData.status === "listed" && (
              <div className={css.productStatusListed}>Listed</div>
            )}
            {productData.status === "notaccepted" && (
              <div className={css.wrapTextPopUpDeactive}>Not accepted</div>
            )}
          </div>
          <div className={css.editButtonProd} onClick={closePop}>
            Edit
            {popUp && (
              <PopUoForProdListVendor
                vendor={productData}
                updateOrderStatusLabel={updateOrderStatusLabel}
              />
            )}
          </div>
        </div>
        <div className={css.wrapInfoInProd}>
          <div className={css.wrapFirstSlider}>
            <PictureBlock productData={productData} />
            {/* <div className={css.blockWithout}>
              <div className={css.wrapOneFilter}>
                <ReactSVG src={eco} />
                <p className={css.pInCompose}>Compostable near you</p>
              </div>
              <div className={css.wrapOneFilter}>
                <ReactSVG src={safe} />
                <p className={css.pInCompose}>Safe for sensitive skin</p>
              </div>
              <div className={css.wrapOneFilter}>
                <ReactSVG src={gmo} />
                <p className={css.pInCompose}>GMO Free</p>
              </div>
              <div className={css.wrapOneFilter}>
                <ReactSVG src={crue} />
                <p className={css.pInCompose}>Cruelty Free</p>
              </div>
            </div> */}
          </div>
          <NearPicture
            productData={productData}
            setBrand={setBrand}
            brand={brand}
            setCartCounterC={setCartCounterC}
          />
        </div>
      </div>
    </div>
  );
};
export default FirstBlock;

import css from "./product.module.css";
import arrowL from "../../svg/leftArrow.svg";
import { ReactSVG } from "react-svg";
import PictureBlock from "./pictureBlock";
import eco from "../../svg/eco.svg";
import safe from "../../svg/safe.svg";
import gmo from "../../svg/gmo.svg";
import crue from "../../svg/grue.svg";
import NearPicture from "./nearPicture";
const FirstBlock = ({ productData, brand, setBrand }) => {
  return (
    <div className={css.wrapFirstBlock}>
      <div className={css.smallWrap}>
        <div className={css.wrapLinkMain}>
          <p className={css.homeP}>Home</p>
          <ReactSVG src={arrowL} className={css.arrowCs} />
          <p className={css.nameProdWiLink}>{productData.product_name}</p>
        </div>
        <div className={css.wrapInfoInProd}>
          <div className={css.wrapFirstSlider}>
            <PictureBlock productData={productData} />
            <div className={css.blockWithout}>
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
            </div>
          </div>
          <NearPicture
            productData={productData}
            setBrand={setBrand}
            brand={brand}
          />
        </div>
      </div>
    </div>
  );
};
export default FirstBlock;

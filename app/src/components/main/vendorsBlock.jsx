import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrowSend from "../../svg/ArrowButtonSend.svg";
import vendorO from "../../img/RectangleVo.png";
import imgE from "../../img/dasdwq.png";
const VendorsBlock = () => {
  return (
    <div className={css.wrapAllVendors}>
      {" "}
      <div className={css.prodFWrap}>
        <p className={css.favoritP}>New Vendors</p>
        <p className={css.shopAllP}>
          Shop All <ReactSVG src={arrowSend} />
        </p>
      </div>
      <div className={css.wrapVendorC}>
        <div className={css.firstVendor}>
          <img src={vendorO} className={css.imageOneV} alt="Vendor" />
          <div className={css.wrapSilky}>
            <div className={css.skinL}>
              <p className={css.pSkinL}>Silky Nature</p>
            </div>
            <div className={css.sArrowD}>
              {" "}
              <ReactSVG src={arrowSend} />
            </div>
          </div>
        </div>
        <div className={css.wrapTwo}>
          <div className={css.wrapFirstOnTwoVendors}>
            <img src={imgE} className={css.imageTwoV} alt="Vendor" />
            <div className={css.wrapSilkyTwo}>
              <div className={css.skinL}>
                <p className={css.pSkinL}>Earth Bound</p>
              </div>
              <div className={css.sArrowD}>
                {" "}
                <ReactSVG src={arrowSend} />
              </div>
            </div>
          </div>
          <div className={css.wrapFirstOnTwoVendors}>
            <img src={imgE} className={css.imageTwoV} alt="Vendor" />
            <div className={css.wrapSilkyTwo}>
              <div className={css.skinL}>
                <p className={css.pSkinL}>Essential Conditioning</p>
              </div>
              <div className={css.sArrowD}>
                {" "}
                <ReactSVG src={arrowSend} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VendorsBlock;

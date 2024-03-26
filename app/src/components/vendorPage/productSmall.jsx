import css from "./vendor.module.css";
import imgd from "../../img/image13.png";
import heart from "../../svg/Heart.svg";
import worldGreen from "../../svg/worldGreen.svg";
import starCol from "../../svg/Starcool.svg";
import starNot from "../../svg/Starnot.svg";
import { ReactSVG } from "react-svg";
import ingD from "../../svg/Ingredientsfd.svg";
import box from "../../svg/Box.svg";
import veg from "../../svg/Vegetarianadf.svg";
import lis from "../../svg/g2452.svg";

const ProductSmall = () => {
  return (
    <div className={css.productSmallWrap}>
      <img src={imgd} className={css.imgForProd} />
      <div className={css.procentDiscount}>36% OFF</div>
      <div className={css.likeBlock}>
        <ReactSVG src={heart} />
      </div>
      <div className={css.wrapNameProd}>
        <p className={css.namePSmallProd}>
          Facemask (Tumeric) Infused Lemon Grass
        </p>
        <ReactSVG src={worldGreen} />
      </div>
      <div className={css.wrapCool}>
        <ReactSVG src={starCol} />
        <ReactSVG src={starCol} />
        <ReactSVG src={starCol} />
        <ReactSVG src={starCol} />
        <ReactSVG src={starNot} />
      </div>
      <p className={css.description}>
        Space for a small product description of and space for description and
        inform.
      </p>
      <div className={css.freeShipWrap}>
        <p className={css.wrapPrice}>36.99 USD</p>
        <p className={css.freShipP}>Free Shipping</p>
      </div>
      <div className={css.wrapDownMen}>
        <div className={css.wrapIcon}>
          <ReactSVG src={ingD} className={css.iocoDInSmallProd} />
          <ReactSVG src={lis} className={css.iocoDInSmallProd} />
          <ReactSVG src={box} className={css.iocoDInSmallProd} />
          <ReactSVG src={ingD} className={css.iocoDInSmallProd} />
        </div>
        <div className={css.wrapHowMachM}>Nearest Recycling 0.3m</div>
      </div>
    </div>
  );
};
export default ProductSmall;

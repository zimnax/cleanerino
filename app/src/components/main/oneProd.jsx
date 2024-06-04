import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../svg/sectificat/dadasd.svg";
import image from "../../img/Rectangle 21.png";
import earth from "../../svg/qwert.svg";
import star from "../../svg/staradas.svg";
const OneProd = () => {
  return (
    <div className={css.wrapOneProd}>
      <div className={css.bigPart}>
        <img className={css.imagePic} src={image} alt="Photo" />
        <div className={css.wrapTitle}>
          <div className={css.wrapNameErth}>
            <p className={css.pName}>BioGold Total Face Revival</p>
            <ReactSVG src={earth} />
          </div>
          <p className={css.mint}>mind_body_spirit</p>
          <div className={css.wrapStar}>
            <ReactSVG src={star} />
            <ReactSVG src={star} />
            <ReactSVG src={star} />
            <ReactSVG src={star} />
            <ReactSVG src={star} />
            47
          </div>
          <p className={css.price}>$29.99</p>
          <p className={css.price}>FREE SHIPPING</p>
        </div>
      </div>
      <div className={css.addtoCartButton}>
        <p className={css.pButPAdd}>Add to Cart</p>
        <ReactSVG src={arrow} className={css.newArrow} />
      </div>
    </div>
  );
};
export default OneProd;

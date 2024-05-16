import css from "./about.module.css";
import { ReactSVG } from "react-svg";
import handSvg from "../../svg/handSvgAbout.svg";
import cartSvg from "../../svg/cartSvgAbout.svg";
import earthSvg from "../../svg/earthSvgAbout.svg";
const FindProd = () => {
  return (
    <div className={css.wrapFindP}>
      <div className={css.wrapIconFind}>
        <ReactSVG src={handSvg} className={css.handSvg} />
        <ReactSVG src={cartSvg} className={css.cartSvg} />
        <ReactSVG src={earthSvg} className={css.earthSvg} />
      </div>
      <p className={css.pInFindBig} id="section2">
        Through our platform, we aim to reduce waste by helping customers find
        the right products from the first try, fostering a more sustainable
        approach to skincare. Ultimately, we envision a skincare industry that
        benefits everyone involved—users, creators, and our planet.{" "}
      </p>
    </div>
  );
};
export default FindProd;

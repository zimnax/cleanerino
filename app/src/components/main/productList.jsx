import css from "./main.module.css";
import arrowSend from "../../svg/ArrowButtonSend.svg";
import { ReactSVG } from "react-svg";
import leftArrowBr from "../../svg/leftArrowBro.svg";
import rightArrowBr from "../../svg/rightArrowBro.svg";
import OneProd from "./oneProd";
import withMySQLData from "../HOK/withMySQLData";
import { useNavigate } from "react-router-dom";
const ProductList = () => {
  const navigate = useNavigate();
  const toContact = () => {
    navigate("/catalog");
  };
  return (
    <div className={css.wrapAllProduct}>
      <div className={css.prodFWrap}>
        <p className={css.favoritP}>Our Favorites</p>
        <p className={css.shopAllP} onClick={toContact}>
          Shop All <ReactSVG src={arrowSend} />
        </p>
      </div>
      <div className={css.wrapProdInMain}>
        <div className={css.wrapNextProd}>
          <ReactSVG src={leftArrowBr} className={css.arroWBro}></ReactSVG>
        </div>
        <div className={css.wrapProdC}>
          <OneProd />
          <OneProd />
          <OneProd />
        </div>
        <div className={css.wrapNextProd}>
          <ReactSVG src={rightArrowBr} className={css.arroWBro}></ReactSVG>
        </div>
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/add`
)(ProductList);

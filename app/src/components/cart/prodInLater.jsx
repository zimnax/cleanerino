import { useEffect, useState } from "react";
import css from "./cart.module.css";
import { ReactSVG } from "react-svg";
import min from "../../svg/akar-icons_minus.svg";
import plusIcon from "../../svg/ant-design_plus-outlined.svg";
import { Link } from "react-router-dom";
const ProdInLater = ({
  el,
  handleRemoveFromCart,
  changeQuantityInCart,
  handleMoveToLater,
}) => {
  const [countProd, setCountProd] = useState(el.quantity);
  const [mainPrice, setMainPrice] = useState(el.price * el.quantity);
  const changeStateDown = () => {
    if (countProd > 1) {
      const newCount = countProd - 1;
      setCountProd(newCount);
      changeQuantityInCart(el.id, newCount);
      setMainPrice(newCount * el.price);
    }
  };

  const changeStateUp = () => {
    const newCount = countProd + 1;
    setCountProd(newCount);
    changeQuantityInCart(el.id, newCount);
    setMainPrice(newCount * el.price);
  };

  useEffect(() => {
    setMainPrice(countProd * el.price);
  }, [el, countProd]);
  const handleChange = (event) => {
    const newCount = parseInt(event.target.value);
    if (!isNaN(newCount) && newCount >= 1) {
      setCountProd(newCount);
      changeQuantityInCart(el.id, newCount);
      setMainPrice(newCount * el.price);
    } else if (event.target.value === "") {
      setCountProd(0);
      changeQuantityInCart(el.id, 0);
      setMainPrice(0);
    }
  };
  return (
    <div className={css.prodInCartWrap}>
      <div className={css.wrapImg}>
        {el && el.files && el.files.length > 0 && (
          <img
            className={css.imgInCart}
            src={el.files[0].file}
            alt="Product photo"
          />
        )}
      </div>
      <div className={css.descriptionWrap}>
        <Link to={`/product/${el.id}`} className={css.nameProd}>
          <p className={css.nameProd}>{el && el.product_name}</p>
        </Link>
        <p className={css.priceP}>
          ${el && el.price}
          <div className={css.line}></div>ID: {el && el.id}
        </p>
        <p className={css.smallDesc}>{el && el.short_description}</p>
        <div className={css.wrapQuon}>
          <p className={css.quontP}>Quantity:</p>
          <div className={css.wrapQuon}>
            <ReactSVG
              src={min}
              className={css.minIconSt}
              onClick={changeStateDown}
            />
            <input
              className={css.counterInput}
              value={countProd}
              onChange={handleChange}
            />
            <ReactSVG
              src={plusIcon}
              className={css.plusIconSt}
              onClick={changeStateUp}
            />
          </div>
        </div>
      </div>
      <div className={css.wrapAllPriceRemout}>
        <div className={css.wrapRemout}>
          <p className={css.saveFor} onClick={() => handleMoveToLater(el.id)}>
            Add to cart
          </p>
          <p className={css.minFor}>-</p>
          <p
            className={css.remoutP}
            onClick={() => handleRemoveFromCart(el.id)}
          >
            Remove
          </p>
        </div>
        <p className={css.fullPrice}>{mainPrice} usd</p>
      </div>
    </div>
  );
};
export default ProdInLater;

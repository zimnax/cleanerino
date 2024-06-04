import { useEffect, useState } from "react";
import withMySQLData from "../../HOK/withMySQLData";
import css from "./product.module.css";
import { ReactSVG } from "react-svg";
import starFull from "../../../svg/StarFull.svg";
import starNotFull from "../../../svg/StarNotFull.svg";
import min from "../../../svg/minusSvg.svg";
import plu from "../../../svg/plusSvg.svg";
import addToCart from "../../../function/addProductToCart";
import { addToCartRed, updateCartQuantity } from "../../../function/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const NearPicture = ({
  productData,
  data,
  brand,
  setBrand,
  setCartCounterC,
}) => {
  const [price, setPrice] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (productData) {
      const price = parseFloat(productData.dimensions[0].price).toFixed(2);
      setPrice(price);
    }
  }, [productData]);
  useEffect(() => {
    const vendor = data.find((item) => item.id === productData.vendorId);
    setBrand(vendor);
  }, [productData, data]);

  // const renderColorBlocks = () => {
  //   const colorVariations = productData.variations.filter(
  //     (variation) => variation.unit === "color"
  //   );

  //   return colorVariations.map((variation, index) => (
  //     <div
  //       key={index}
  //       className={css.oneColor}
  //       style={{ background: variation.parameter_value.toLowerCase() }}
  //     ></div>
  //   ));
  // };
  const toVendor = () => {
    navigate(`/vendor/page/${brand.id}`);
  };
  const changeCounter = (e) => {
    const value = parseInt(e.target.value);
    setCount(e.target.value);
  };

  const minCount = () => {
    if (count > 1) {
      setCount(parseFloat(count) - 1);
    }
  };

  const plusCount = () => {
    setCount(parseFloat(count) + 1);
  };

  const renderColorBlocks = () => {
    if (!productData.variations || productData.variations.length === 0) {
      return null; // Повертаємо null, якщо немає жодної варіації
    }
    const colorVariations = productData.variations.filter(
      (variation) => variation.unit === "color"
    );

    return colorVariations.map((variation, index) => {
      const price = parseFloat(variation.price).toFixed(2);
      return (
        <div
          key={index}
          className={`${css.oneColor} ${
            activeIndex === index ? css.activeColor : ""
          }`}
          style={{
            background: variation.parameter_value
              ? variation.parameter_value.toLowerCase()
              : "transparent",
          }}
          onClick={() => {
            setPrice(price);
            setActiveIndex(index);
          }}
        ></div>
      );
    });
  };
  const addingToCart = (id, price) => {
    addToCart(id, price, count);

    let cartItems = [];

    // отримуємо корзину з localStorage
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      cartItems = JSON.parse(storedCart);
    }

    // перевіряємо чи товар вже є в корзині
    const existingProductIndex = cartItems.findIndex((item) => item.uid === id);

    setCartCounterC((prev) => prev + 1);
  };

  return (
    <div className={css.wrapTextInProd}>
      <p className={css.pictureNameMain}>{productData.product_name}</p>
      {brand && brand.brand_name && (
        <p className={css.brandNameStyle} onClick={toVendor}>
          Brand: {brand.brand_name}
        </p>
      )}
      {brand && !brand.brand_name && (
        <p className={css.brandNameStyle} onClick={toVendor}>
          Brand: Brand
        </p>
      )}
      <div className={css.wrapStarRating}>
        <ReactSVG src={starFull} className={css.starF} />
        <ReactSVG src={starFull} className={css.starF} />
        <ReactSVG src={starFull} className={css.starF} />
        <ReactSVG src={starNotFull} className={css.starNotF} />
        <p className={css.review}>(200 Reviews)</p>
      </div>
      {/* <p className={css.smallDesv}>{productData.short_description}</p>
      {productData.quantity < 10 && (
        <p className={css.stock}>
          Availability:&nbsp;
          <span className={css.onlyT}>
            Only {productData.quantity} in Stock
          </span>
        </p>
      )}
      {productData.quantity > 10 && (
        <p className={css.stock}>
          Availability:&nbsp;
          <span className={css.onlyT}>In Stock</span>
        </p>
      )}
      <div className={css.line}></div> */}
      {productData.variations.some(
        (variation) => variation.unit === "color"
      ) && (
        <div className={css.selectColorWrap}>
          <p className={css.stockTwo}>Select a Color</p>
          <div className={css.circWrapColor}>{renderColorBlocks()}</div>
        </div>
      )}

      <p className={css.price}>${price}</p>
      {/* <div className={css.counterWrap}>
        <button className={css.minusButton} onClick={minCount}>
          <ReactSVG src={min} className={css.stMin} />
        </button>
        <input
          className={css.counterInput}
          value={count}
          onChange={changeCounter}
        />
        <button className={css.minusButtonPlus} onClick={plusCount}>
          <ReactSVG src={plu} className={css.stMin} />
        </button>
      </div> */}
      {/* <div className={css.wrapButtonsProd}>
        <button
          className={css.addToCard}
          onClick={() => addingToCart(productData.id, price)}
        >
          Add to Cart
        </button>
      </div> */}
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
)(NearPicture);

import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../svg/arrowBigLeftP.svg";
import { Link } from "react-router-dom";
import worldGreen from "../../svg/newProdSmallWorld.svg";
import handPret from "../../svg/handPre.svg";
import cart from "../../svg/cartJS.svg";
import worldBlue from "../../svg/worldBlue.svg";
import { useEffect, useState } from "react";
import srarSmallE from "../../svg/bigStarProdOne.svg";
import starNotOpen from "../../svg/bigStarNotOpenOneProd.svg";
import addToCart from "../../function/addProductToCart";
import withMySQLData from "../HOK/withMySQLData";
const ProdSmallNew = ({ el, setCartCounterC, data }) => {
  const [serRating, setSerRating] = useState(0);
  const [brand, setBrand] = useState(null);
  useEffect(() => {
    const vendor = data.find((item) => item.id === el.vendorId);
    setBrand(vendor);
  }, [el, data]);
  useEffect(() => {
    if (el.reviews) {
      const totalRatings = el.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = (totalRatings / el.reviews.length).toFixed(1);

      setSerRating(averageRating);
    }
  }, [el]);
  const addingToCart = (id, price) => {
    addToCart(id, price, 1);

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
    <div className={css.wrapNewProdOne}>
      <div className={css.firstBlockProductSmall}>
        <img
          src={el.files[0].file}
          className={css.newPhotoInSmallProd}
          alt="Photo"
        />

        <div className={css.wrapNameProd}>
          <Link to={`/product/${el.id}`} className={css.namePSmallProd}>
            {el.product_name}
          </Link>
          <ReactSVG src={worldGreen} />
        </div>
        <div className={css.wrapNameProdSmall}>
          <p className={css.brandName}>{brand && brand.brand_name}</p>
          {/* {certification &&
            certification.map((idx, index) => {
              return (
                <img
                  key={index}
                  src={idx.image}
                  alt="Certifications"
                  className={css.certificateS}
                />
              );
            })} */}
        </div>
        <div className={css.starSp}>
          {[1, 2, 3, 4, 5].map((index) => (
            <ReactSVG
              key={index}
              src={index <= serRating ? srarSmallE : starNotOpen}
            />
          ))}
        </div>
        <p className={css.wrapPrice}>${el.dimensions[0].price}</p>
      </div>
      <div
        className={css.productAddToCartNew}
        onClick={() => addingToCart(el.id, el.dimensions[0].price)}
      >
        Add to Cart
        <ReactSVG src={arrow} className={css.arrowLeftBut} />
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
)(ProdSmallNew);

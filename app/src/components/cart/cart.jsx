import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";
import Header from "../standartComponent/header";
import css from "./cart.module.css";
import ProdInCart from "./prodInCart";
import { removeFromCart } from "../../function/deleteProduct";
import { moveItemToLater } from "../../function/addToLater";
import { changeQuantityInCart } from "../../function/changeQuo";
import { removeFromLater } from "../../function/deleteProductLater";
import { moveItemToCart } from "../../function/addProdFromLaterToC";
import ProdInLater from "./prodInLater";
import HeaderNormal from "../standartComponent/headerNormal";
import HeaderModernWhite from "../standartComponent/headerModernWhite";
const Cart = ({ activeUser, data, setCartCounterC, quor }) => {
  const [prodInCart, setProdInCart] = useState(null);
  const [prodInLater, setProdInLater] = useState(null);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    if (data && data.products && cartProducts.length > 0) {
      const productsWithQuantities = cartProducts.map((product) => {
        const foundProduct = data.products.find((p) => p.id === product.uid);
        return {
          ...foundProduct,
          quantity: product.quantity,
          price: product.price,
        };
      });
      setProdInCart(productsWithQuantities);
    }
  }, [data]);
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("later")) || [];
    if (data && data.products && cartProducts.length > 0) {
      const productsWithQuantities = cartProducts.map((product) => {
        const foundProduct = data.products.find((p) => p.id === product.uid);
        return {
          ...foundProduct,
          quantity: product.quantity,
          price: product.price,
        };
      });
      setProdInLater(productsWithQuantities);
    }
  }, [data]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId); // Виклик функції видалення товару з корзини
    // Оновлення стану компонента після видалення товару
    setProdInCart((prevProdInCart) =>
      prevProdInCart.filter((item) => item.id !== productId)
    );
    setCartCounterC((prev) => prev + 1);
  };
  const handleMoveToLater = (productId) => {
    moveItemToLater(productId); // Виклик функції перенесення товару у список "Save for Later"

    // Оновлення стану компоненти після переміщення товару
    setProdInCart((prevProdInCart) =>
      prevProdInCart.filter((item) => item.id !== productId)
    );
    const laterProducts = JSON.parse(localStorage.getItem("later")) || [];
    if (data && data.products && laterProducts.length > 0) {
      const productsWithQuantities = laterProducts.map((product) => {
        const foundProduct = data.products.find((p) => p.id === product.uid);
        return {
          ...foundProduct,
          quantity: product.quantity,
          price: product.price,
        };
      });
      setProdInLater(productsWithQuantities);
    }
  };
  const handleMoveToCart = (productId) => {
    moveItemToCart(productId); // Виклик функції перенесення товару у список "Save for Later"

    // Оновлення стану компоненти після переміщення товару
    setProdInLater((prevProdInCart) =>
      prevProdInCart.filter((item) => item.id !== productId)
    );
    const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    if (data && data.products && cartProducts.length > 0) {
      const productsWithQuantities = cartProducts.map((product) => {
        const foundProduct = data.products.find((p) => p.id === product.uid);
        return {
          ...foundProduct,
          quantity: product.quantity,
          price: product.price,
        };
      });
      setProdInCart(productsWithQuantities);
    }
  };
  useEffect(() => {
    if (prodInCart) {
      let totalQuantity = 0;
      let totalPrice = 0;
      prodInCart.forEach((product) => {
        totalQuantity += product.quantity;
        totalPrice += product.quantity * product.price;
      });
      setTotalQuantity(totalQuantity);
      setTotalPrice(totalPrice);
    }
  }, [prodInCart]);
  return (
    <>
      <HeaderModernWhite activeUser={activeUser} totalQuantity={quor} />

      <div className={css.wrapCart}>
        <div className={css.smallWrap}>
          <div className={css.prodWrap}>
            {prodInCart && <p className={css.pInCart}>Shopping Cart</p>}
            {prodInCart &&
              prodInCart.map((el, index) => {
                return (
                  <ProdInCart
                    key={index}
                    el={el}
                    handleRemoveFromCart={handleRemoveFromCart}
                    changeQuantityInCart={changeQuantityInCart}
                    handleMoveToLater={handleMoveToLater}
                    setTotalQuantity={setTotalQuantity}
                    setTotalPrice={setTotalPrice}
                    setCartCounterC={setCartCounterC}
                  />
                );
              })}
            {prodInLater && <p className={css.pInCartY}>Saved for Later</p>}
            {prodInLater &&
              prodInLater.map((el, index) => {
                return (
                  <ProdInLater
                    key={index}
                    el={el}
                    handleRemoveFromCart={removeFromLater}
                    changeQuantityInCart={changeQuantityInCart}
                    handleMoveToLater={handleMoveToCart}
                  />
                );
              })}
          </div>
          <div className={css.wrapAllSum}>
            <div className={css.wrapPrice}>
              <p className={css.firOrder}>Order Summary</p>
              <div className={css.wrapFirSmall}>
                <p className={css.itemSub}>
                  Item Subtotal{" "}
                  <span className={css.itemSpan}>({totalQuantity})</span>
                </p>
                <p className={css.allPrice}>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button className={css.buttonCheckout}>Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/add`
)(Cart);

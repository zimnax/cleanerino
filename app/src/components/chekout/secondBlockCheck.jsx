import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";
import css from "./checkout.module.css";
const SecondBlockCheck = ({
  data,
  setSubtotal,
  subtotal,
  setProdInCart,
  prodInCart,
  tax,
  allPostPay,
  totalShip,
  fullTotalPriceR,
}) => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  useEffect(() => {
    const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
    if (data && data.products && cartProducts.length > 0) {
      const productsWithQuantities = cartProducts.map((product) => {
        const foundProduct = data.products.find((p) => p.id === product.uid);
        const price = parseFloat(product.price); // Конвертуємо ціну у числовий тип

        return {
          ...foundProduct,
          quantity: product.quantity,
          price: price, // Використовуємо числове значення ціни
          subtotal: price * product.quantity,
        };
      });
      const totalSubtotal = productsWithQuantities.reduce(
        (acc, curr) => acc + curr.subtotal,
        0
      );
      const totalQuantity = productsWithQuantities.reduce(
        (acc, curr) => acc + curr.quantity,
        0
      );
      setProdInCart(productsWithQuantities);
      setSubtotal(totalSubtotal);
      setTotalQuantity(totalQuantity);
    }
  }, [data]);
  return (
    <div className={css.secondBlockCheckWr}>
      <p className={css.todayOrderSum}>Today’s Order Summary</p>
      <div className={css.wrapProductOrder}>
        {prodInCart &&
          prodInCart.map((el, index) => {
            return (
              <div key={index} className={css.prodWrapS}>
                <img
                  className={css.imageInCheckout}
                  src={el.files[0].file}
                  alt="Photo"
                />
                <div className={css.wrapNameAndCount}>
                  <p className={css.nameProduct}>{el.product_name}</p>
                  <p className={css.prodQuontP}>Quantity: {el.quantity}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={css.wrapItemSubTot}>
        <p className={css.itemSubTotalP}>
          Item Subtotal (
          <span className={css.subTotalSpan}>{totalQuantity}</span>)
        </p>
        <p className={css.subTotalPrice}>${subtotal}</p>
      </div>
      <div className={css.line}></div>
      <div className={css.wrapItemSubTot}>
        <p className={css.itemSubTotalP}>Total Before Tax</p>
        <p className={css.subTotalPrice}>${subtotal}</p>
      </div>
      {allPostPay && (
        <div className={css.wrapItemSubTotMar}>
          <p className={css.itemSubTotalP}>Shipping</p>
          <p className={css.subTotalPrice}>${totalShip}</p>
        </div>
      )}
      {tax !== null && (
        <div className={css.wrapItemSubTotMar}>
          <p className={css.itemSubTotalP}>Tax</p>
          <p className={css.subTotalPrice}>${tax}</p>
        </div>
      )}
      <div className={css.line}></div>
      <div className={css.wrapItemSubTot}>
        <p className={css.itemSubTotalPGrand}>Grand Total</p>
        <p className={css.itemSubTotalPGrand}>${fullTotalPriceR}</p>
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add`
)(SecondBlockCheck);

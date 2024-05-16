import { useEffect, useState } from "react";
import axios from "axios";
import css from "./orders.module.css";
import { Link } from "react-router-dom";
const OneOrderProduct = ({ product, formattedDate, timeData }) => {
  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add/${product.product_id}`
        );
        setProductData(response.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();

    return () => {
      setProductData(null);
    };
  }, [product]);

  return (
    <>
      <tr className={css.secondTr}>
        <td className={css.tdClassProd}>
          {productData && productData.files && (
            <img
              src={productData.files[0].file}
              className={css.photoProduct}
              alt="Photo"
            />
          )}{" "}
          {productData && (
            <Link className={css.tdClassProd} to={`/product/${productData.id}`}>
              {productData.product_name}
            </Link>
          )}
        </td>
        <td className={css.tdClassProd}>{timeData}</td>
        <td className={css.tdClassProd}>{product.price}</td>
        <td className={css.tdClassProd}>{product.quantity}</td>
      </tr>
    </>
  );
};
export default OneOrderProduct;

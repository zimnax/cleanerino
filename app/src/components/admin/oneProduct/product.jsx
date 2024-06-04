import { useParams } from "react-router-dom";
// import Header from "../standartComponent/header";
import css from "./product.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import FirstBlock from "./firstBlock";
import SecondBlock from "./secondBlock";

import withMySQLData from "../../HOK/withMySQLData";
// import HeaderNormal from "../standartComponent/headerNormal";
// import HeaderModernWhite from "../standartComponent/headerModernWhite";
import Reviews from "./reviews";
// import Footer from "../standartComponent/footer";

const Product = ({ data, activeUser, setCartCounterC, totalQuantity }) => {
  let params = useParams();
  const [productData, setProductData] = useState(null);
  const [brand, setBrand] = useState(null);
  const [ingridients, setIngridients] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/add/${params.id}`
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
  }, [params.id]);
  useEffect(() => {
    setIngridients(data);
  }, [data]);

  return (
    <>
      {productData && (
        <>
          <FirstBlock
            productData={productData}
            setProductData={setProductData}
            setBrand={setBrand}
            brand={brand}
            setCartCounterC={setCartCounterC}
          />
          <SecondBlock
            productData={productData}
            brand={brand}
            ingridients={ingridients}
          />
          <Reviews productData={productData} />
        </>
      )}
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/ingridients`
)(Product);

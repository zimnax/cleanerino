import { useParams } from "react-router-dom";
import Header from "../standartComponent/header";
import css from "./product.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import FirstBlock from "./firstBlock";
import SecondBlock from "./secondBlock";
import AlsoLike from "./alsoLike";
import withMySQLData from "../HOK/withMySQLData";
import HeaderNormal from "../standartComponent/headerNormal";

const Product = ({ data }) => {
  let params = useParams();
  const [productData, setProductData] = useState(null);
  const [brand, setBrand] = useState(null);
  const [ingridients, setIngridients] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/vendor/product/add/${params.id}`
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
  console.log(productData);
  return (
    <>
      <HeaderNormal />
      {productData && (
        <>
          <FirstBlock
            productData={productData}
            setBrand={setBrand}
            brand={brand}
          />
          <SecondBlock
            productData={productData}
            brand={brand}
            ingridients={ingridients}
          />
          <AlsoLike />
        </>
      )}
    </>
  );
};
export default withMySQLData("http://localhost:4000/api/v1/ingridients")(
  Product
);

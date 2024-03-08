import React, { useState, useEffect } from 'react';
import "../styles/certificates.css";
import one from "../../img/homePage/certificate/Certified organic ingredients.png";
import two from "../../img/homePage/certificate/Cleanerino Group 2017.png";
import three from "../../img/homePage/certificate/Cleanerino Natural Ingredients.png";
import four from "../../img/homePage/certificate/Cleanerino No Harsh Chemical.png";
import five from "../../img/homePage/certificate/Cleanerino Vegan.png";
import six from "../../img/homePage/certificate/Cleanerino cruelty-free.png";
import seven from "../../img/homePage/certificate/Fair Trade Certified.png";

const initialProducts = [
    {imgSrc: one},
    {imgSrc: two},
    {imgSrc: three},
    {imgSrc: four},
    {imgSrc: five},
    {imgSrc: six},
    {imgSrc: seven}
];

const ImageSlider = () => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const timer = setInterval(() => {
      setProducts(prevProducts => {
        // Move the first element to the end to achieve circular array rotation
        const nextProducts = [...prevProducts.slice(1), prevProducts[0]];
        return nextProducts;
      });
    }, 2000); // Rotate the image order every 2 seconds

    // Cleanup the timer when unmounting
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='slider-container'>
      <div className='slide active'>
        {products.map((product, index) => ( // Only render the first product
        <div className='slide active' key={index}>
          <img className='certificates' src={product.imgSrc} alt="Product certificate"/>
        </div>
      ))}
      </div>
    </div>
  );
};

export default ImageSlider;

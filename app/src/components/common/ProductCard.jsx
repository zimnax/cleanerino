import React from "react";
import "../styles/productCard.css"; // Make sure to create this CSS file

const ProductCard = ({ product }) => {
  // Helper function to render stars based on rating
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= product.rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.imageSrc} alt={product.title} />
      </div>
      <div className="product-info">
        <h3>{product.title}</h3>
        <div className="product-rating">{renderStars()}</div>
        <p className="product-description">{product.description}</p>
        <div className="product-price">{product.price}</div>
        <div className="product-extras">
          {product.freeShipping && <div>Free Shipping</div>}
          {product.recyclingInfo && <div>Nearest Recycling {product.recyclingInfo}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

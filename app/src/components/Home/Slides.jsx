import React, { useState, useEffect } from "react";
import "../styles/slideShow.css";
import frame from "../../img/homePage/cleanerino_frame.png";

const images = [
  frame,
  frame,
  frame,
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // Function to navigate to a specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <img
            src={image}
            alt={`Slide ${index}`}
            key={index}
            className={`slideshow-image ${
              index === currentSlide ? "active" : ""
            }`}
          />
        ))}
      </div>
      <div className="slideshow-controls">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slide-indicator ${
              index === currentSlide ? "active" : ""
            }`}
            onClick={() => goToSlide(index)}
          >
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;

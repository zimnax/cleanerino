/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import "../../styles/testimonials.css"; // Make sure to create a corresponding CSS file to style your components
import TestimonialCard from "./TestimonialCard";
import TestimonialsList from "./TestimonialsList";
import { testimonialsData } from "../../../tempData";
import { testimonials } from "../../styles/HomePageStyles";

function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(
    testimonialsData[0]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleTestimonialClick = (testimonial,index) => {
    setCurrentTestimonial(testimonial);
    setCurrentIndex(index);
  };

  return (
    <div className="testimonials-section">
      <h2>
        See what people are <span class="highlight"> saying about us</span>
      </h2>
      <p>
        Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
      </p>
      <div css={testimonials.testimonialsContainer}>
        <TestimonialCard testimonial={currentTestimonial} />
        <TestimonialsList
          testimonials={testimonialsData}
          onTestimonialClick={handleTestimonialClick}
          index={currentIndex}
        />
      </div>
    </div>
  );
}

export default Testimonials;

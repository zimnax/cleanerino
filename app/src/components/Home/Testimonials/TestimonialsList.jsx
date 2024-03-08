/** @jsxImportSource @emotion/react */
import React from "react";
import { testimonials as test } from "../../styles/HomePageStyles";

function TestimonialsList({ testimonials, onTestimonialClick, index }) {
  return (
    <div css={test.testimonialsList}>
      {testimonials.map((testimonial, i) => (
        <img
          src={testimonial.image}
          css={
            i === index
              ? test.activeTestimonialsListImg
              : test.testimonialsListImg
          }
          key={testimonial.id}
          onClick={() => onTestimonialClick(testimonial, i)}
        ></img>
      ))}
    </div>
  );
}

export default TestimonialsList;

/** @jsxImportSource @emotion/react */
import React from "react";
import { testimonials } from "../../styles/HomePageStyles";

function TestimonialCard({ testimonial }) {
  return (
    <div css={testimonials.testimonialCard}>
      <p>{testimonial.text}</p>
      <div css={testimonials.testimonialCardName}>
        <b>{testimonial.name}</b>
        <small>{testimonial.position}</small>
      </div>
    </div>
  );
}

export default TestimonialCard;

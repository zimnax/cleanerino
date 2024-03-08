import { css } from "@emotion/react";

export const testimonials = {
  testimonialsContainer: css`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px; /* adjust the gap as needed */
    margin-bottom: 30px;
  `,
  testimonialCard: css`
    padding: 20px;
    max-width: 500px; /* adjust as needed */
    height: 192px;
    display: flex;
    flex-direction: column; /* stack items vertically */
    justify-content: center; /* center items vertically */
    gap: 10px;
    margin: auto;
  `,
  testimonialCardName: css`
    text-align: right;
  `,
  testimonialsList: css`
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* creates 3 columns */
    grid-template-rows: repeat(2, 1fr); /* creates 2 rows */
    width: 540px;
    height: 350px;
    gap: 30px;
  `,
  testimonialsListImg: css`
    border-radius: 8px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    opacity: 0.5;
  `,
  activeTestimonialsListImg: css`
    border-radius: 8px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    object-fit: cover;
    opacity: 1;
  `,
};

export const videoCss = {
  video: css`
    padding: 20px;
    width: 100%;
    display: block;
  `,
  videoWrapper: css`
    position: relative;
    display: inline-block;
  `,
  playButton: css`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 35px; /* Adjust size of the triangle here */
    border-color: transparent transparent transparent white; /* Triangle color */
    transform: translate(-50%, -50%); /* Center the button */
    cursor: pointer;
    background-color: transparent;
    border-radius: 5px; /* Optional: if you want rounded corners */
    outline: none; /* Removes the outline to make it look better */
  `,
};

export const faqs = {
  faqsContainor: css`
    width: 100%;
    align-items: center;
    background: #f7f9ec;
    padding: 100px 0;
  `,
  faqs: css`
    width: 928px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr auto; /* Left column fills the space, right column has content width */
    gap: 20px; /* 20px gap between the two columns */
  `,
  faqsRight: css`
    width: 256px;
  `,
};

export const newIn = {
  
};

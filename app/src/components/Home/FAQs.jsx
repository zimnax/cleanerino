/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { faqs } from "../styles/HomePageStyles";
import { faqs as faqsData } from "../../tempData";
import "../styles/faqs.css"

const AccordionItem = ({ faq, index, toggleFAQ }) => (
    <div className="accordion-item">
    <div className="accordion-title" onClick={() => toggleFAQ(index)}>
      <h4>{faq.question}</h4>
      <span>{faq.open ? '↓' : '→'}</span>
    </div>
    {faq.open && (
      <div className="accordion-content">
        {faq.answer}
      </div>
    )}
  </div>
);

function FAQs() {
  const [faqsState, setFaqs] = useState(
    faqsData.map((faq, index) => ({ ...faq, open: index === 0 ? true : false }))
  );

  const toggleFAQ = (index) => {
    setFaqs(
      faqsState.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      })
    );
  };

  return (
    <div css={faqs.faqsContainor}>
      <div css={faqs.faqs}>
        <div>
          {faqsState.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              index={index}
              toggleFAQ={toggleFAQ}
            />
          ))}
        </div>
        <div css={faqs.faqsRight}>
          <h1>Frequently Asked Questions</h1>
          <p>
            Can’t find the answer you’re looking for? Reach out to our customer
            support team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FAQs;

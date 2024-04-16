import { useState } from "react";
import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrowOpen from "../../svg/svgFor/arrowOpenF.svg";
import arrowClose from "../../svg/svgFor/arrowCloseF.svg";
import arrow from "../../svg/sectificat/dadasd.svg";
import { useNavigate } from "react-router-dom";
const Faq = () => {
  const navigate = useNavigate();
  const [firstF, setFirstF] = useState(true);
  const [secondF, setSecondF] = useState(false);
  const [threF, setThreF] = useState(false);
  const [fourF, setFourF] = useState(false);
  const toContact = () => {
    navigate("/contact");
  };
  return (
    <div className={css.wrapFaq}>
      <p className={css.pFaqMain}>FAQ</p>
      <div className={css.wrapOneFaqTop} onClick={() => setFirstF(!firstF)}>
        <p className={css.oneFaqP}>
          How is Cleanerino different from other clean product platforms?
        </p>
        {!firstF && <ReactSVG src={arrowOpen} />}
        {firstF && <ReactSVG src={arrowClose} />}
      </div>
      {firstF && (
        <p className={css.descriptionFaq}>
          We carefully evaluate product ingredients, packaging sustainability,
          and brand practices to ensure only safe, clean, and sustainable
          products make it onto our platform. This includes banning harsh
          chemicals, promoting recyclable or compostable packaging, and
          partnering with brands committed to sustainable production. We do this
          to ensure the products you buy on Cleanerino will work for your unique
          needs.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setSecondF(!secondF)}>
        <p className={css.oneFaqP}>
          How to make the most of Cleanerino’s customization?
        </p>
        {!secondF && <ReactSVG src={arrowOpen} />}
        {secondF && <ReactSVG src={arrowClose} />}
      </div>
      {secondF && (
        <p className={css.descriptionFaq}>
          To ensure the products you see fit your skin needs, allergy profile,
          and personal preferences, use the filters on the website to customize
          your feed without registering or create a profile to save information
          about your allergies, ingredient preferences, etc. In that way, you
          will only see the products that fit your personal needs. You can also
          save search preferences to find the options you need faster next time.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setThreF(!threF)}>
        <p className={css.oneFaqP}>
          Can I pick up my purchase from the vendor directly if we live in the
          same city?
        </p>
        {!threF && <ReactSVG src={arrowOpen} />}
        {threF && <ReactSVG src={arrowClose} />}
      </div>
      {threF && (
        <p className={css.descriptionFaq}>
          If a vendor offers order pick-up, you will be able to choose this
          option at check-out. The pick-up address will be listed on your order
          confirmation, and once the order is processed, the vendor will be in
          touch to agree on the pick-up day and time.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setFourF(!fourF)}>
        <p className={css.oneFaqP}>How do I know my order’s been shipped?</p>
        {!fourF && <ReactSVG src={arrowOpen} />}
        {fourF && <ReactSVG src={arrowClose} />}
      </div>
      {fourF && (
        <p className={css.descriptionFaq}>
          When your order’s been shipped, you will receive an email notification
          to confirm order shipment and a tracking link. You can also check your
          order status in your Cleanerino dashboard.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapFaqContact}>
        <p className={css.stiilCont}>
          Still can’t find what you’re looking for? Contact our Customer Support
          Team for more!
        </p>{" "}
        <div className={css.constactButton} onClick={toContact}>
          <p className={css.pButPAdd}>Contact Us</p>
          <ReactSVG src={arrow} className={css.newArrow} />
        </div>
      </div>
    </div>
  );
};
export default Faq;

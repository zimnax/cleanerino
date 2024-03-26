import { useState } from "react";
import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrowOpen from "../../svg/svgFor/arrowOpenF.svg";
import arrowClose from "../../svg/svgFor/arrowCloseF.svg";
import arrow from "../../svg/sectificat/dadasd.svg";
const Faq = () => {
  const [firstF, setFirstF] = useState(true);
  const [secondF, setSecondF] = useState(false);
  const [threF, setThreF] = useState(false);
  const [fourF, setFourF] = useState(false);
  return (
    <div className={css.wrapFaq}>
      <p className={css.pFaqMain}>FAQ</p>
      <div className={css.wrapOneFaqTop} onClick={() => setFirstF(!firstF)}>
        <p className={css.oneFaqP}>How are your products certified?</p>
        {!firstF && <ReactSVG src={arrowOpen} />}
        {firstF && <ReactSVG src={arrowClose} />}
      </div>
      {firstF && (
        <p className={css.descriptionFaq}>
          Join our growing community of other like minded makers and customers
          connected through a passion for safe natural products and the planet
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setSecondF(!secondF)}>
        <p className={css.oneFaqP}>How do I get a refund?</p>
        {!secondF && <ReactSVG src={arrowOpen} />}
        {secondF && <ReactSVG src={arrowClose} />}
      </div>
      {secondF && (
        <p className={css.descriptionFaq}>
          Join our growing community of other like minded makers and customers
          connected through a passion for safe natural products and the planet
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setThreF(!threF)}>
        <p className={css.oneFaqP}>
          What happens when I don’t receive an item?
        </p>
        {!threF && <ReactSVG src={arrowOpen} />}
        {threF && <ReactSVG src={arrowClose} />}
      </div>
      {threF && (
        <p className={css.descriptionFaq}>
          Join our growing community of other like minded makers and customers
          connected through a passion for safe natural products and the planet
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setFourF(!fourF)}>
        <p className={css.oneFaqP}>How do I customize my order?</p>
        {!fourF && <ReactSVG src={arrowOpen} />}
        {fourF && <ReactSVG src={arrowClose} />}
      </div>
      {fourF && (
        <p className={css.descriptionFaq}>
          Join our growing community of other like minded makers and customers
          connected through a passion for safe natural products and the planet
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapFaqContact}>
        <p className={css.stiilCont}>
          Still can’t find what you’re looking for? Contact our Customer Support
          Team for more!
        </p>{" "}
        <div className={css.constactButton}>
          <p className={css.pButPAdd}>Contact Us</p>
          <ReactSVG src={arrow} className={css.newArrow} />
        </div>
      </div>
    </div>
  );
};
export default Faq;

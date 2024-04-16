import css from "./about.module.css";
import phyIcon from "../../svg/philosophyJkd.svg";
import { ReactSVG } from "react-svg";
import { useState } from "react";
import arrowClose from "../../svg/svgFor/arrowCloseF.svg";
import arrow from "../../svg/sectificat/dadasd.svg";
import arrowOpen from "../../svg/svgFor/arrowOpenF.svg";
import fisrtIconSub from "../../svg/joinArrow.svg";
import microb from "../../svg/microb.svg";
import threeLinkd from "../../svg/subThreA.svg";
import listgD from "../../svg/g2452ds.svg";
import earthFor from "../../svg/earthForrSubstain.svg";
import cartF from "../../svg/cartForSubst.svg";
const Substainability = () => {
  const [firstF, setFirstF] = useState(false);
  const [secondF, setSecondF] = useState(false);
  const [threF, setThreF] = useState(false);
  const [fourF, setFourF] = useState(false);
  const [fiveF, setFiveF] = useState(false);
  const [sixF, setSixF] = useState(false);
  const [sevenF, setSevenF] = useState(false);
  return (
    <div className={css.approachWrap}>
      <ReactSVG src={phyIcon} />
      <p className={css.subMaitP}>Sustainability</p>
      <p className={css.pDescSubstaine}>
        Every product listed on Cleanerino meets our strict criteria for
        ingredients and packaging.
      </p>
      <p className={css.allInFormul}>All ingredients in formulations </p>
      <div className={css.wrapOneFaqTop} onClick={() => setFirstF(!firstF)}>
        <p className={css.oneFaqP}>
          <ReactSVG src={fisrtIconSub} className={css.subIconList} />
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
          <ReactSVG src={microb} className={css.subIconList} />
          Are NOT linked to diseases.
        </p>
        {!secondF && <ReactSVG src={arrowOpen} />}
        {secondF && <ReactSVG src={arrowClose} />}
      </div>
      {secondF && (
        <p className={css.descriptionFaq}>
          Cleanerino does everything possible to keep the platform free from
          products that contain carcinogenic ingredients or ingredients damaging
          respiratory organs, skin or other parts of the body.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setThreF(!threF)}>
        <p className={css.oneFaqP}>
          <ReactSVG src={threeLinkd} className={css.subIconList} />
          Don’t contain harsh chemicals.
        </p>
        {!threF && <ReactSVG src={arrowOpen} />}
        {threF && <ReactSVG src={arrowClose} />}
      </div>
      {threF && (
        <p className={css.descriptionFaq}>
          Our vendors do not use chemicals that can be harmful for the human
          body or the environment in their formulations. You won’t see
          ingredients that are scientifically proven to have harmful effects on
          your body or species that share this planet with us.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setFourF(!fourF)}>
        <p className={css.oneFaqP}>
          {" "}
          <ReactSVG src={listgD} className={css.subIconList} />
          Are formulated properly and address real concerns
        </p>
        {!fourF && <ReactSVG src={arrowOpen} />}
        {fourF && <ReactSVG src={arrowClose} />}
      </div>
      {fourF && (
        <p className={css.descriptionFaq}>
          All formulations are safe and stable to ensure that while no harsh
          chemicals are present, the products are safe to use throughout their
          shelf life. The combinations of ingredients address a real skin
          concern, such as dryness or acne.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setFiveF(!fiveF)}>
        <p className={css.oneFaqP}>
          {" "}
          <ReactSVG src={earthFor} className={css.subIconList} />
          Are safe for the environment.
        </p>
        {!fiveF && <ReactSVG src={arrowOpen} />}
        {fiveF && <ReactSVG src={arrowClose} />}
      </div>
      {fiveF && (
        <p className={css.descriptionFaq}>
          We examine product labels to ensure the ingredients used in
          formulations don’t contaminate waterways or have a negative impact on
          soil, wildlife, and air quality.
        </p>
      )}
      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setSixF(!sixF)}>
        <p className={css.oneFaqP}>
          {" "}
          <ReactSVG src={cartF} className={css.subIconList} />
          Packaging is reusable, recyclable, or compostable.
        </p>
        {!sixF && <ReactSVG src={arrowOpen} />}
        {sixF && <ReactSVG src={arrowClose} />}
      </div>
      {sixF && (
        <p className={css.descriptionFaq}>
          We take every effort to ensure the packaging our products come in can
          be recycled or composted in a customer’s zip code.
        </p>
      )}

      <div className={css.faqLine}></div>
      <div className={css.wrapOneFaqTop} onClick={() => setSevenF(!sevenF)}>
        <p className={css.oneFaqP}>
          {" "}
          <ReactSVG src={phyIcon} className={css.subIconList} />
          Brand integrity
        </p>
        {!sevenF && <ReactSVG src={arrowOpen} />}
        {sevenF && <ReactSVG src={arrowClose} />}
      </div>
      {sevenF && (
        <p className={css.descriptionFaq}>
          The producer is committed to promoting the values or transparency in
          their business practices, environmental, economic, and social
          sustainability.
        </p>
      )}
      <div className={css.faqLastLine}></div>
    </div>
  );
};
export default Substainability;

import css from "./about.module.css";
import phyIcon from "../../svg/philosophyJkd.svg";
import { ReactSVG } from "react-svg";
import firstPhoto from "../../img/firstPhotoApp.png";
import secondPhoto from "../../img/RectangleAppCream.png";
import yellowCos from "../../img/yelowPicture.png";
import hand from "../../img/heandPI.png";
const Approach = () => {
  return (
    <div className={css.approachWrap}>
      <ReactSVG src={phyIcon} />
      <p className={css.approacheMaitP}>Approach</p>
      <p className={css.pApproachDesc}>
        We seek out the best products made by the best makers of the best
        ingredients formulated in a way that will work for you.
      </p>
      <div className={css.approachBlockWrap}>
        <img src={firstPhoto} className={css.approachPhoto} alt="Photo" />
        <div className={css.wrapApproachWithout}>
          <p className={css.titlePInB}>Clean, safe and sustainable</p>
          <p className={css.descApTit}>
            Great products are made of great ingredients, combined in proper
            proportions. The product formulation needs to be safe and stable as
            well as contain responsibly sourced ingredients. Each item listed on
            the platform is compliant with our sustainability criteria for
            ingredients and packaging.
          </p>
        </div>
      </div>
      <div className={css.approachBlockWrap}>
        <img src={secondPhoto} className={css.approachPhoto} alt="Photo" />
        <div className={css.wrapApproachWithoutTwo}>
          <p className={css.titlePInB}>Customized Recommendations</p>
          <p className={css.descApTit}>
            Everyone’s body is different, but we all want our personal care
            products to work for us. We take into account individual skin and
            hair types, allergies and sensitivities to curate a feed of products
            that will be unique to every customer. Our recommendation system
            relies on analyzing ingredients to ensure they benefit specific skin
            types, address particular concerns, and provide desired benefits.
          </p>
        </div>
      </div>
      <div className={css.approachBlockWrap}>
        <img src={yellowCos} className={css.approachPhoto} alt="Photo" />
        <div className={css.wrapApproachWithoutThree}>
          <p className={css.titlePInB}>Finding producers in your area</p>
          <p className={css.descApTit}>
            There are producers of high-quality personal care products in nearly
            every town. There probably are a few within 5 miles from your home.
            Small independent makers use the best ingredients and tend to know
            their suppliers personally. Cleanerino exists to make it easier for
            customers to find local producers. Buying locally does not only help
            cut transportation emissions, but also supports your local economy.
          </p>
        </div>
      </div>
      <div className={css.approachBlockWrap}>
        <img src={hand} className={css.approachPhoto} alt="Photo" />
        <div className={css.wrapApproachWithoutFour}>
          <p className={css.titlePInB}>Supporting independent makers</p>
          <p className={css.descApTit} id="section3">
            For sustainable product producers, especially for new and niche
            ones, reaching customers can be difficult. We’ve simplified the
            registration process and removed high fee barriers for vendors to be
            able to reach their customers online. To make it easier for you to
            support specific brands and underrepresented communities, we’re
            designed a system of tags and filters, so you can purchase from a
            small maker that supports causes you care about.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Approach;

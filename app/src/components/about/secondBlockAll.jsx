import css from "./about.module.css";
import first from "../../img/IMG_7441.png";
import sonS from "../../img/shutterstock_103.png";
import erc from "../../img/shutterstock_150670181.png";
import twoPf from "../../img/IMG_7398.png";
import boxP from "../../img/IMG_7402asd.png";
import { ReactSVG } from "react-svg";
import phyIcon from "../../svg/philosophyJkd.svg";
import ecoL from "../../svg/ecoL.svg";
const SecondBlockAll = () => {
  return (
    <div className={css.secondBlockAllWr}>
      <div className={css.philosophyWrap}>
        <div className={css.wrapWithLogo}>
          <ReactSVG src={phyIcon} />
          <p className={css.pOurPhy}>Our Philosophy</p>
        </div>
        <div className={css.secondPhy}>
          <div className={css.secondPhySmal}>
            <div className={css.ourStart}>
              <ReactSVG src={ecoL} />
              <p className={css.ourStartP}>Our start</p>
            </div>
            <p className={css.descStatP}>
              We started Cleanerino with a firm belief that when it comes to
              personal care, one size does NOT fit all. We recognize the diverse
              needs, allergy profiles, and belief systems of our customers.
              That’s why we made it our mission to make personal care shopping a
              highly personalized, safe, and ethical experience. We strive to
              empower our customers to make informed decisions about the
              products that purchase, leading to healthier bodies and a
              healthier planet.
            </p>
          </div>
          <div className={css.secondPhySmalTwo}>
            <div className={css.ourStartBel}>
              <ReactSVG src={ecoL} />
              <p className={css.ourStartP}>We believe</p>
            </div>
            <p className={css.descStatP}>
              We believe in the power of great ingredients to create exceptional
              products. Our commitment is to find brands that use only
              ingredients that are safe for both the human body and the
              environment. By keeping harmful, unsafe, and unsustainable
              ingredients away from our platform, we aim to simplify the search
              for effective solutions. Our goal is to make it faster, easier,
              and less stressful for customers to find products that truly work
              for them, allowing them to spend more time enjoying the benefits
              of their skincare, body care, and home care routines.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SecondBlockAll;

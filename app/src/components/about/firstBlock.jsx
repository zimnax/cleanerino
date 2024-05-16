import css from "./about.module.css";
import arrow from "../../svg/arrowAboutO.svg";
import { ReactSVG } from "react-svg";

const FirstBlock = () => {
  return (
    <div className={css.firstBlockWrap}>
      <div className={css.wrapaboutTitle}>
        <p className={css.aboutTitle}>About</p>
        <div className={css.wrapLinkTo}>
          <div className={css.wrapButton}>
            <div className={css.nameLink}>Our Philosophy</div>
            <a href="#section1" className={css.sendToId}>
              <ReactSVG src={arrow} className={css.arowStyle} />
            </a>
          </div>
          <div className={css.wrapButton}>
            <div className={css.nameLinkT}>Approach</div>
            <a href="#section2" className={css.sendToId}>
              <ReactSVG src={arrow} className={css.arowStyle} />
            </a>
          </div>
          <div className={css.wrapButton}>
            <div className={css.nameLink} id="section1">
              Standards & Sustainability{" "}
            </div>
            <a href="#section3" className={css.sendToId}>
              <ReactSVG src={arrow} className={css.arowStyle} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FirstBlock;

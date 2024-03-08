/** @jsxImportSource @emotion/react */
import { subHeadubgs } from "../styles/CommonComponents";
import leftImage from "../../img/sub-heading-leaf.png";

const SubheadingComponent = ({ text, link }) => (
  <div css={subHeadubgs.subheadingComponent}>
    <div css={subHeadubgs.textContainer}>
      <img src={leftImage} alt="Lead Icon" css={subHeadubgs.leafImage} />
      <h2 className={subHeadubgs.subHeadingText}>{text}</h2>
    </div>
    <a href={link} css={subHeadubgs.showMoreButton}>
      Shop More ›
    </a>
  </div>
);

export default SubheadingComponent;

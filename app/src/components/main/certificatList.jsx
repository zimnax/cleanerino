import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import one from "../../svg/sectificat/Group1.svg";
import two from "../../svg/sectificat/surface1.svg";
import thre from "../../svg/sectificat/Organic - QAI 1.svg";
import four from "../../svg/sectificat/Group 29.svg";
import five from "../../svg/sectificat/fair trade 1.svg";
import six from "../../svg/sectificat/Page-2.svg";
import seven from "../../svg/sectificat/Group 28.svg";
import eight from "../../svg/sectificat/ecocert 1.svg";
import nine from "../../svg/sectificat/Group 15.svg";
import ten from "../../svg/sectificat/asdfasdf.svg";
import qw from "../../svg/sectificat/leaping bunny2 1.svg";
import eq from "../../svg/sectificat/asa.svg";
const CertificateList = () => {
  return (
    <div className={css.sectificatAllWrap}>
      <ReactSVG src={one} />
      <ReactSVG src={two} />
      <ReactSVG src={thre} />
      <ReactSVG src={four} />
      <ReactSVG src={five} />
      <ReactSVG src={six} />
      <ReactSVG src={seven} />
      <ReactSVG src={eight} />
      <ReactSVG src={nine} />
      <ReactSVG src={ten} />
      <ReactSVG src={qw} />
      <ReactSVG src={eq} />
    </div>
  );
};
export default CertificateList;

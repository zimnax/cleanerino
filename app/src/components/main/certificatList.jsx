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
      <ReactSVG src={one} className={css.certWrapInF} />
      <ReactSVG src={two} className={css.certWrapInF} />
      <ReactSVG src={thre} className={css.certWrapInF} />
      <ReactSVG src={four} className={css.certWrapInF} />
      <ReactSVG src={five} className={css.certWrapInF} />
      <ReactSVG src={six} className={css.certWrapInF} />
      <ReactSVG src={seven} className={css.certWrapInF} />
      <ReactSVG src={eight} className={css.certWrapInF} />
      <ReactSVG src={nine} className={css.certWrapInF} />
      <ReactSVG src={ten} className={css.certWrapInF} />
      <ReactSVG src={qw} className={css.certWrapInF} />
      <ReactSVG src={eq} className={css.certWrapInF} />
    </div>
  );
};
export default CertificateList;

import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import o from "../../svg/svgFor/o.svg";
import eae from "../../img/aeaPh.png";
import lineO from "../../svg/svgFor/lineO.svg";
import hand from "../../img/hand.png";
import smaliImg from "../../img/smileImga.png";
import plamif from "../../svg/svgFor/plaio.svg";
import lake from "../../img/lake.png";
import heandP from "../../svg/svgFor/headnPe.svg";
import shopO from "../../svg/svgFor/shopO.svg";
import earsU from "../../svg/svgFor/earscr.svg";
import arrow from "../../svg/sectificat/dadasd.svg";
import { useNavigate } from "react-router-dom";
const DoorsToWord = () => {
  const navigate = useNavigate();
  const toContact = () => {
    navigate("/vendorRegistration");
  };
  return (
    <div className={css.wrapOpenDoors}>
      <div className={css.wrapRalativeBlock}>
        <ReactSVG src={o} className={css.oSvg} />
        <img className={css.oaeImage} src={eae} alt="photo" />
        <ReactSVG src={lineO} className={css.lineOF} />
        <ReactSVG src={lineO} className={css.lineOS} />
        <ReactSVG src={lineO} className={css.lineOT} />
        <img className={css.handImage} src={hand} alt="photo" />
        <img className={css.smileImage} src={smaliImg} alt="photo" />
        <ReactSVG src={plamif} className={css.plamd} />
        <img className={css.lake} src={lake} alt="photo" />
      </div>
      <div className={css.wrapOpenDorsShop}>
        <div className={css.wrapSmallIcon}>
          <ReactSVG src={heandP} className={css.svgMarg} />
          <ReactSVG src={shopO} className={css.svgMarg} />
          <ReactSVG src={earsU} className={css.svgMarg} />
        </div>
        <p className={css.titleOpenDors}>Open your doors to the world</p>
        <p className={css.descOpenDors}>
          Join our growing community of other like minded makers and customers
          connected through a passion for safe natural products and the planet
        </p>
        <div className={css.openShopBut} onClick={toContact}>
          <p className={css.pButPAdd}>Open a Shop</p>
          <ReactSVG src={arrow} className={css.newArrow} />
        </div>
      </div>
    </div>
  );
};
export default DoorsToWord;

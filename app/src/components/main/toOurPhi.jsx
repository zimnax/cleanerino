import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import phi from "../../svg/sectificat/philosophy 1.svg";
import arrow from "../../svg/sectificat/dadasd.svg";
import { useNavigate } from "react-router-dom";
const ToOutPhi = () => {
  const navigate = useNavigate();
  const toContact = () => {
    navigate("/contact");
  };
  return (
    <div className={css.wrapPhilo}>
      <div className={css.wrapOurPhiA}>
        <ReactSVG src={phi} />
        <p className={css.markerP}>
          A marketplace dedicated to beauty products safe for your skin and the
          planet
        </p>
        <p className={css.pBecause}>
          Because not all ingredients are created equal.
        </p>
        <div className={css.buttonLinkP} onClick={toContact}>
          <p className={css.pButP}>Our Philosophy</p>
          <ReactSVG src={arrow} className={css.newArrow} />
        </div>
      </div>
    </div>
  );
};
export default ToOutPhi;

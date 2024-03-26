import css from "../../../../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import x from "../../../../../../svg/x.svg";
const PopUpMessage = ({ text, setPopUpMes }) => {
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <ReactSVG src={x} className={css.x} />
        <p className={css.congrad}>Message</p>
        <p className={css.pFirstP}>{text}</p>

        <button
          className={css.buttonAddMore}
          onClick={() => setPopUpMes(false)}
        >
          OK
        </button>
      </div>
    </div>
  );
};
export default PopUpMessage;

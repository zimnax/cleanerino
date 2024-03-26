import css from "../../../../../vendorReg/vendorReg.module.css";

import { ReactSVG } from "react-svg";
import x from "../../../../../../../svg/x.svg";
const PopUpNext = ({ changeProdFinal }) => {
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <ReactSVG src={x} className={css.x} />
        <p className={css.congrad}>Congratulations</p>
        <p className={css.pFirstP}>
          Your product has been successfully modified.
        </p>

        <button className={css.buttonAddMore} onClick={changeProdFinal}>
          Done
        </button>
      </div>
    </div>
  );
};
export default PopUpNext;

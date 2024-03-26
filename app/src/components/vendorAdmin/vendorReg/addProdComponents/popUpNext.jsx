import css from "../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import x from "../../../../svg/x.svg";
const PopUpNext = ({ startNewProd, setAddProdPage, skipToDash }) => {
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <ReactSVG src={x} className={css.x} />
        <p className={css.congrad}>Congratulations</p>
        <p className={css.pFirstP}>
          Your first product has been added to Cleanerino
        </p>
        <div className={css.wrapButtonPop}>
          <button className={css.buttonAddMore} onClick={startNewProd}>
            Add more product
          </button>
          <button className={css.nextPage} onClick={skipToDash}>
            Customize store
          </button>
        </div>
      </div>
    </div>
  );
};
export default PopUpNext;

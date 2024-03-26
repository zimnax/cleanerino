import css from "../vendorAdmin/vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import x from "../../svg/x.svg";
import { useNavigate } from "react-router-dom";
const PopUpNext = ({ setOpenPop }) => {
  const navigete = useNavigate();
  const startNewProd = () => {
    navigete("/");
  };
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <ReactSVG src={x} className={css.x} />
        <p className={css.congrad}>Congratulations</p>
        <p className={css.pFirstP}>Registration successful</p>

        <button className={css.buttonAddMore} onClick={startNewProd}>
          Main
        </button>
      </div>
    </div>
  );
};
export default PopUpNext;

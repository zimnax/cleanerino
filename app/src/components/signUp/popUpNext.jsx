import css from "../vendorAdmin/vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import x from "../../svg/x.svg";
import { useNavigate } from "react-router-dom";
const PopUpNext = ({ setOpenPop }) => {
  const navigete = useNavigate();
  const startNewProd = () => {
    setOpenPop(false);
    navigete("/shop");
  };
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <ReactSVG src={x} className={css.x} onClick={() => setOpenPop(false)} />
        <p className={css.congrad}>You’re logged in</p>
        {/* <p className={css.pFirstP}>You have successfully logged in</p> */}

        <button className={css.buttonAddMore} onClick={startNewProd}>
          Start shopping
        </button>
      </div>
    </div>
  );
};
export default PopUpNext;

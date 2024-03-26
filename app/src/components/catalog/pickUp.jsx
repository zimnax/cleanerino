import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";
import arrDo from "../../svg/fdsewhj.svg";
import deliver from "../../svg/ph_truck-light.svg";
const PickUp = () => {
  return (
    <div className={css.oneLabelFilter}>
      <div className={css.labelWithIconWr}>
        <ReactSVG src={deliver} className={css.filrersIcon} />
        <p className={css.fForAll}>Pickup & Delivery</p>
      </div>
      <ReactSVG src={arrDo} />
    </div>
  );
};
export default PickUp;

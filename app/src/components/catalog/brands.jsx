import css from "./catalog.module.css";
import { ReactSVG } from "react-svg";

import arrDo from "../../svg/fdsewhj.svg";
import bran from "../../svg/fsdfgsf.svg";
const Brands = () => {
  return (
    <div className={css.oneLabelFilter}>
      <div className={css.labelWithIconWr}>
        <ReactSVG src={bran} className={css.filrersIcon} />
        <p className={css.fForAll}>Brands</p>
      </div>
      <ReactSVG src={arrDo} />
    </div>
  );
};
export default Brands;

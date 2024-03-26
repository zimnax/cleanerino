import css from "./vendor.module.css";
import arrowD from "../../svg/newInDown.svg";
import { ReactSVG } from "react-svg";
import ProductSmall from "./productSmall";
const RightPanel = () => {
  return (
    <div className={css.rightPanelWrap}>
      <div className={css.wrapTopRight}>
        <p className={css.resultSearch}>Showing 55 results for “abc”</p>
        <p className={css.newIn}>
          New In <ReactSVG src={arrowD} className={css.arrowInM} />
        </p>
      </div>
      <div className={css.wrapAllProduct}>
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
        <ProductSmall />
      </div>
    </div>
  );
};
export default RightPanel;

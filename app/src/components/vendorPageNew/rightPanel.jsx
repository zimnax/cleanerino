import css from "./catalog.module.css";
import arrowD from "../../svg/newInDown.svg";
import { ReactSVG } from "react-svg";
import ProductSmall from "./productSmall";
const RightPanel = ({ listOfProduct, nameProduct }) => {
  return (
    <div className={css.rightPanelWrap}>
      <div className={css.wrapTopRight}>
        {nameProduct ? (
          <>
            <p className={css.resultSearch}>
              Showing {listOfProduct.length} results for “{nameProduct}”
            </p>
            <div style={{ flex: 1 }} />{" "}
          </>
        ) : (
          <div style={{ flex: 1 }} />
        )}
        <p className={css.newIn}>
          New In <ReactSVG src={arrowD} className={css.arrowInM} />
        </p>
      </div>
      <div className={css.wrapAllProduct}>
        {listOfProduct &&
          listOfProduct.map((el, index) => {
            return <ProductSmall key={index} el={el} />;
          })}
      </div>
    </div>
  );
};
export default RightPanel;

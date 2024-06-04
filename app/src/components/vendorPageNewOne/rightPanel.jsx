import css from "./catalog.module.css";
import arrowD from "../../svg/newInDown.svg";
import { ReactSVG } from "react-svg";
import ProductSmall from "./productSmall";
import ProdSmallNew from "./prodSmallNew";
const RightPanel = ({ listOfProduct, nameProduct, setCartCounterC }) => {
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
      </div>
      <div className={css.wrapAllProduct}>
        {listOfProduct &&
          listOfProduct.map((el, index) => {
            return (
              <ProdSmallNew
                key={index}
                el={el}
                setCartCounterC={setCartCounterC}
              />
            );
          })}
      </div>
    </div>
  );
};
export default RightPanel;

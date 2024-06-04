import css from "./product.module.css";
import { ReactSVG } from "react-svg";
import x from "../../../svg/x.svg";
import { useNavigate } from "react-router-dom";
const PopUpIngrid = ({ setOpenPop, ingrid }) => {
  return (
    <div className={css.wrapPopUp}>
      <div className={css.popWr}>
        <p className={css.congrad}>All Ingredients</p>
        <div className={css.wrapIngridInPop}>
          {ingrid &&
            ingrid.map((el, index) => {
              return (
                <p className={css.pFirstP} key={index}>
                  ·&nbsp; {el}
                </p>
              );
            })}
        </div>
        <button className={css.buttonAddMore} onClick={() => setOpenPop(false)}>
          Done
        </button>
      </div>
    </div>
  );
};
export default PopUpIngrid;

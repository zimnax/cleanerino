import css from "./checkout.module.css";
import { ReactSVG } from "react-svg";
import gidtIcon from "../../svg/fluentdsa.svg";
const Gifts = () => {
  return (
    <div className={css.wrapGifts}>
      <p className={css.giftsCardP}>Gift Cards and Discounts</p>
      <div className={css.wrapGiftAndC}>
        <div className={css.gidtWrap}>
          <div className={css.wrapAddGift}>
            <div className={css.iconAndGiftWrap}>
              <ReactSVG src={gidtIcon} className={css.giftIconS} />
              <p className={css.inGifP}>Gift Card</p>
            </div>
          </div>
        </div>
        <div className={css.gidtWrap}></div>
      </div>
    </div>
  );
};
export default Gifts;

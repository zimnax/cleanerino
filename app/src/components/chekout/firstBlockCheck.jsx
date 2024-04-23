import { useState } from "react";
import css from "./checkout.module.css";
import Shiping from "./shiping";
import { ReactSVG } from "react-svg";
import addNewAdd from "../../svg/addNewAddress.svg";
import AddAddressToSend from "./addAddressToSend";
import Gifts from "./gifts";
const FirstBlockCheck = ({ users }) => {
  const [publicProf, setPublicProf] = useState(true);
  const [brand, setBrand] = useState(false);
  const handleItemClick = (setter) => {
    setPublicProf(false);
    setBrand(false);

    setter(true);
  };
  return (
    <div className={css.firstBlockCheckWrap}>
      <p className={css.pCheckOut}>Checkout</p>
      <ul className={css.profileUl}>
        <li
          className={
            publicProf
              ? `${css.profileLi} ${css.profileLiActive}`
              : css.profileLi
          }
          onClick={() => handleItemClick(setPublicProf)}
        >
          Shipping
        </li>
        <li
          className={
            brand ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setBrand)}
        >
          Self Pickup
        </li>
      </ul>
      {publicProf && <Shiping users={users} />}
      <div className={css.addNewAddress}>
        <ReactSVG src={addNewAdd} className={css.addNewAdd} />
        Add Address
      </div>
      <AddAddressToSend />
      <Gifts />
    </div>
  );
};
export default FirstBlockCheck;

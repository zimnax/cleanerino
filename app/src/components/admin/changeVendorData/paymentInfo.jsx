import css from "../vendorProductSt.module.css";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import masterCart from "../../../img/pngegg2.png";
import visa from "../../../img/pngegg1.png";
import discovery from "../../../img/discover-logo-png-pic-5667 1.png";
import paypal from "../../../img/paypal.png";
const PaymentInfo = ({ users }) => {
  const [checkedCards, setCheckedCards] = useState(null);
  useEffect(() => {
    if (users) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/vendor/card/${users.id}`)
        .then((response) => {
          const activeCards = response.data.data.filter(
            (card) => card.is_active === "true"
          );
          setCheckedCards(activeCards);
          console.log("activeCards", activeCards);
        })
        .catch((error) => {
          console.error("Error fetching cards:", error);
        });
    }
  }, [users]);

  return (
    <div className={css.wrapPabAnfSet}>
      <p className={css.venDescTop}>Payment information</p>

      {checkedCards && checkedCards.length > 0 && (
        <div className={css.wrapPayMethod}>
          {checkedCards[0].provider === "master" && (
            <img
              src={masterCart}
              className={css.masterCartIcon}
              alt="MasterCard"
            />
          )}
          {checkedCards[0].provider === "visa" && (
            <img src={visa} className={css.masterCartIcon} alt="Visa" />
          )}
          {checkedCards[0].provider === "discovery" && (
            <img
              src={discovery}
              className={css.masterCartIcon}
              alt="Discovery"
            />
          )}
          {checkedCards[0].provider === "paypal" && (
            <img src={paypal} className={css.masterCartIcon} alt="Paypal" />
          )}
          <p className={css.cardHolderStyle}>{checkedCards[0].card_holder}</p>
          <p className={css.cardHolderStyle}>{checkedCards[0].card_number}</p>
        </div>
      )}
    </div>
  );
};
export default PaymentInfo;

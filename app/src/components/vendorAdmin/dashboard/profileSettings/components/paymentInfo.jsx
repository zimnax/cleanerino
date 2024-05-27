import { useEffect, useRef, useState } from "react";
import css from "../profile.module.css";
import masterCart from "../../../../../img/pngegg2.png";
import visa from "../../../../../img/pngegg1.png";
import discovery from "../../../../../img/discover-logo-png-pic-5667 1.png";
import paypal from "../../../../../img/paypal.png";
import addSvg from "../../../../../svg/addSvg.svg";
import paypalTwo from "../../../../../img/payPalTwo.png";
import finance from "../../../../../svg/Finance.svg";
import { ReactSVG } from "react-svg";
import axios from "axios";
const PaymentInfo = ({
  users,
  setCardName,
  cardName,
  setCardNumber,
  cardNumber,
  sendDataToServer,
  selectedCard,
  setSelectedCard,
}) => {
  const [allCard, setAllCard] = useState([]);
  const [checked, setChecked] = useState(false); // Стан для збереження стану чекбокса
  const [debitPay, setDebitPay] = useState(false);
  const [checkedCards, setCheckedCards] = useState([]);
  // Функція для зміни стану чекбокса
  // const handleChange = (index) => {
  //   const updatedCheckedCards = [...checkedCards];
  //   updatedCheckedCards[index] = !updatedCheckedCards[index];
  //   setCheckedCards(updatedCheckedCards);
  //   const cardId = allCard[index].id; // Отримати id карти
  //   const newIsActiveValue = updatedCheckedCards[index] ? "true" : "false"; // Отримати нове значення is_active
  //   updateCard(cardId, newIsActiveValue); // Відправити запит на оновлення на сервер
  // };
  const handleChange = async (index) => {
    const updatedCheckedCards = [...checkedCards];
    const cardId = allCard[index].id; // Отримати id карти
    const newIsActiveValue = !updatedCheckedCards[index]; // Отримати нове значення is_active

    try {
      // Отримати всі карти користувача
      const userCards = allCard.filter((card) => card.vendors_id === users.id);

      // Якщо користувач вибрав нову карту і вона має стати активною
      if (newIsActiveValue) {
        // Оновіть всі картки користувача, встановивши їх is_active на false
        await Promise.all(
          userCards.map(async (card) => {
            await axios.put(
              `${process.env.REACT_APP_API_URL}/api/v1/vendor/card/${card.id}`,
              {
                is_active: "false",
              }
            );
          })
        );
      }

      // Оновіть поточну картку, встановивши її is_active на newIsActiveValue
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/card/${cardId}`,
        {
          is_active: newIsActiveValue.toString(),
        }
      );

      // Оновіть стан чекбоксів та дані карток після успішного оновлення
      setCheckedCards(
        updatedCheckedCards.map((value, idx) =>
          idx === index ? newIsActiveValue : false
        )
      );
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };

  const updateCard = async (cardId, newIsActiveValue) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/card/${cardId}`,
        {
          is_active: newIsActiveValue,
        }
      );
    } catch (error) {
      console.error("Error updating card:", error);
    }
  };
  const handleCardClick = (cardType) => {
    setSelectedCard(cardType);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {};
    formData.vendors_id = users.id;
    formData.provider = selectedCard;
    formData.card_holder = cardName;
    formData.card_number = cardNumber;
    formData.is_active = `${false}`;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/card`,
        formData
      );

      setAllCard((prevCards) => [...prevCards, response.data]);

      // Оновіть стан чекбоксів
      setCheckedCards((prevChecked) => [...prevChecked, false]);
      // Додаткова логіка, якщо потрібно
    } catch (error) {
      console.error("Помилка при додаванні карти:", error);
    }
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/vendor/card/${users.id}`)
      .then((response) => {
        setAllCard(response.data.data);
        setCheckedCards(
          response.data.data.map((card) => card.is_active === "true")
        );
      })
      .catch((error) => {
        console.error("Error fetching cards:", error);
      });
  }, [users.id]);

  return (
    <div className={css.paymentInfoWrap}>
      <div className={css.firstBlockPay}>
        <div className={css.nameProviderPay}>
          <div className={css.wrapCardProv}>
            <div
              className={selectedCard === "master" ? css.selected : css.master}
              onClick={() => handleCardClick("master")}
            >
              <img
                src={masterCart}
                className={css.masterCartIcon}
                alt="MasterCard"
              />
            </div>
            <div
              className={selectedCard === "visa" ? css.selected : css.master}
              onClick={() => handleCardClick("visa")}
            >
              <img src={visa} className={css.masterCartIcon} alt="Visa" />
            </div>
            <div
              className={
                selectedCard === "discovery" ? css.selected : css.master
              }
              onClick={() => handleCardClick("discovery")}
            >
              <img
                src={discovery}
                className={css.masterCartIcon}
                alt="Discovery"
              />
            </div>
            <div
              className={selectedCard === "paypal" ? css.selected : css.master}
              onClick={() => handleCardClick("paypal")}
            >
              <img src={paypal} className={css.masterCartIcon} alt="Paypal" />
            </div>
          </div>
          <p className={css.selectPCard}>
            Select a card or bank account where you’d like Cleanerino to deposit
            the payment for your products.
          </p>
        </div>
        <div className={css.payButtonAdd}>
          <ReactSVG src={addSvg} />
          <p className={css.pInButton}>Pay out info</p>
        </div>
      </div>
      <div className={css.wrapMyCard}>
        {allCard.length > 0 &&
          allCard.map((el, index) => {
            const lastFourDigits = el.card_number
              ? el.card_number.substring(el.card_number.length - 4)
              : "N/A";
            return (
              <div
                className={
                  checkedCards[index] ? css.oneCardWrapChecked : css.oneCardWrap
                }
                key={index}
              >
                <div className={css.checkboxWrapper}>
                  <label className={css.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={checkedCards[index]}
                      onChange={() => handleChange(index)}
                      className={css.checkboxInput}
                    />
                    <span
                      className={css.checkboxCustom}
                      style={{
                        borderColor: checkedCards[index] ? "#609966" : "#CCC",
                      }}
                    >
                      {checkedCards[index] && (
                        <span className={css.innerCircle}></span>
                      )}
                    </span>
                  </label>
                </div>
                {el.provider === "master" && <img src={masterCart} />}
                {el.provider === "visa" && <img src={visa} />}
                {el.provider === "paypal" && <img src={paypal} />}
                {el.provider === "discovery" && <img src={discovery} />}
                <div className={css.cardNamber}>
                  <p className={css.cardNameOne}>My Debit Card</p>
                  <p className={css.cardNumberOne}>**** {lastFourDigits}</p>
                </div>
              </div>
            );
          })}
      </div>
      <div className={css.wrapCardAdd}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Payment information</p>
          <p className={css.secondText}>
            Fill out the fields on the right to link an account.{" "}
          </p>
        </div>
        <div className={css.addPayDetails}>
          <p className={css.mainTextPSecond}>Paymet method</p>
          <div className={css.wrapDebitIconPay}>
            <div
              className={debitPay ? css.wrapPalIcon : css.wrapPalIconActive}
              onClick={() => setDebitPay(false)}
            >
              <img src={paypalTwo} />
            </div>
            <div
              className={debitPay ? css.wrapDebitTwoActive : css.wrapDebitTwo}
              onClick={() => setDebitPay(true)}
            >
              <ReactSVG src={finance} />
              <p className={css.debC}>Debit card</p>
            </div>
          </div>
          {debitPay && (
            <div className={css.inputsWrap}>
              <div className={css.firstCardInput}>
                <p className={css.pInInput}>Card Holder</p>
                <input
                  className={css.inputBorderNone}
                  value={cardName}
                  placeholder="Name"
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className={css.firstCardInput}>
                <p className={css.pInInput}>Card Number</p>
                <input
                  className={css.inputBorderNone}
                  value={cardNumber}
                  placeholder="0000 0000 0000 0000"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>
          )}
          {!debitPay && (
            <div className={css.inputsWrap}>
              <div className={css.firstCardInput}>
                <p className={css.pInInput}>Name</p>
                <input
                  className={css.inputBorderNone}
                  value={cardName}
                  placeholder="Name"
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className={css.firstCardInput}>
                <p className={css.pInInput}>Email</p>
                <input
                  className={css.inputBorderNone}
                  value={cardNumber}
                  placeholder="Email"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
            </div>
          )}
          <div className={css.wrapButtonPayment}>
            <button className={css.buttonSavePay} onClick={handleSubmit}>
              Save
            </button>
            <button className={css.buttonCancelPay}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentInfo;

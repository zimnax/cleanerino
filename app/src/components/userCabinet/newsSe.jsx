import { useEffect, useState } from "react";
import css from "./cabinet.module.css";
import axios from "axios";
const NewsSe = ({ users }) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    if (users.news === "true") {
      setIsChecked(true);
    }
    if (users.news === "false") {
      setIsChecked(false);
    }
  }, [users]);
  const firstRadioCha = () => {
    setIsChecked(!isChecked);
    handleRadioChange();
  };
  const handleRadioChange = async () => {
    const data = new FormData();
    const formDataObj = Object.fromEntries(data.entries());
    formDataObj.news = !isChecked ? "true" : "false";
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/users/profile/${users.id}`, // Потрібно замінити userId на відповідний id користувача
        formDataObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.statusText === "OK") {
      }
      // Додайте тут логіку для обробки успішної відправки даних
    } catch (error) {
      console.error("Error sending data:", error);

      // Додайте тут логіку для обробки помилки відправки даних
    }
  };
  return (
    <div className={css.wrapPabAnfSet}>
      <div className={css.wrapOneBlock}>
        <p className={css.pInNews}>
          Allow vendors to reach out to you with discounts and promotions
        </p>
        <div className={css.chaWr}>
          <label className={css.check} onClick={firstRadioCha}>
            <input
              name="returns"
              type="radio"
              className={css.check__check}
              checked={isChecked}
              onChange={() => {}} // Порожня функція, щоб уникнути помилок
            />
            <span className={css.check__indicator}></span>
          </label>
          {!isChecked && <p className={css.of}>No</p>}
          {isChecked && <p className={css.on}>Yes</p>}
        </div>
      </div>
    </div>
  );
};
export default NewsSe;

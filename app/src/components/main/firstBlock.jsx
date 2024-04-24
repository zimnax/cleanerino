import { useState } from "react";
import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../svg/VectorarrowSelect.svg";
import arrowSend from "../../svg/ArrowButtonSend.svg";
import { setText } from "../../function/textSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const FirstBlock = () => {
  const [find, setFind] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFind(e.target.value);
    dispatch(setText(e.target.value)); // Відправляємо значення в редуктор
  };
  const sendData = () => {
    navigate("/shop");
  };
  return (
    <div className={css.firstBlockWrap}>
      <div className={css.wrapText}>
        <p className={css.firstBlockText}>
          Find products safe for your skin and the planet
        </p>
        <div className={css.wrapFindM}>
          <div className={css.wrapTwoInputsFirst}>
            <input
              className={css.inputBack}
              value={find}
              placeholder="Find my new favorite..."
              onChange={handleInputChange}
            />
            <div className={css.wrapSection}>
              <p className={css.textInSelect}>Skin Cream</p>
              <ReactSVG src={arrow} className={css.arrowSelect} />
            </div>
          </div>
          <div className={css.sendInfoButton} onClick={sendData}>
            <ReactSVG src={arrowSend} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FirstBlock;

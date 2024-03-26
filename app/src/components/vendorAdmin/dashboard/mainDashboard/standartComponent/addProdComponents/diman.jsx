import { useState } from "react";
import css from "../../../../vendorReg/vendorReg.module.css";
import { ReactSVG } from "react-svg";
import add from "../../../../../../svg/Add.svg";
const Diman = ({ setColor, color }) => {
  const [savePriceForAll, setSavePriceForAll] = useState(true);
  const [savedPrice, setSavedPrice] = useState(0);
  const [isD, setIsD] = useState(false);
  const handleAddSize = () => {
    setColor([...color, { color: 0, price: 0 }]);
  };

  const handleRadioChange = () => {
    setIsD(!isD); // Toggle the radio button

    // Calculate the new price value
    const newPrice = isD ? 0 : color.length > 0 ? color[0].price : 0;

    // Update the saved price
    setSavedPrice(newPrice);

    // Update all sizes with the new price
    const updatedSizes = color.map((size) => ({
      ...size,
      price: newPrice,
    }));
    setColor(updatedSizes);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSizes = [...color];
    updatedSizes[index][field] = value;
    if (savePriceForAll && field === "price") {
      // Якщо зберігання ціни для всіх ввімкнено, зберігаємо ціну для всіх розмірів
      setSavedPrice(parseFloat(value));
    }
    setColor(updatedSizes);
  };
  return (
    <>
      {/*|||||||||||||||||||||||||||||||||||||||||||||||| */}
      <div className={css.newSize}>
        <div className={css.secWrPD}>
          <label className={css.grenLab}>Save price for all</label>
          <div className={css.chaWrnew}>
            <label className={css.checkTJ} onClick={handleRadioChange}>
              <input
                name="refunds"
                type="radio"
                className={css.check__checkOJ}
                checked={isD}
                onChange={() => {}} // Порожня функція, щоб уникнути помилок
              />
              <span className={css.check__indicatorOJ}></span>
            </label>
          </div>
        </div>
        <label className={css.labelInpBold}>Color</label>
        {color.map((size, index) => (
          <div className={css.wrapNewS}>
            <div className={css.weiNewWrBig}>
              <label className={css.labelInp}>Ex. Purple</label>
              <input
                className={css.inpWeigBig}
                type="text"
                placeholder="Purple"
                value={size.shape}
                onChange={(e) =>
                  handleInputChange(index, "color", e.target.value)
                }
              />
            </div>

            <div className={css.weiNewWrT}>
              <div className={css.wrapPrW}>
                <label className={css.labelInp}>Price</label>
              </div>
              <input
                className={css.inpWeig}
                type="number"
                placeholder="15"
                value={size.price}
                onChange={(e) =>
                  handleInputChange(index, "price", e.target.value)
                }
              />
            </div>
          </div>
        ))}
        <div className={css.addNewm} onClick={handleAddSize}>
          <ReactSVG src={add} />
          <label className={css.addPd}>Add another size</label>
        </div>
      </div>
    </>
  );
};
export default Diman;

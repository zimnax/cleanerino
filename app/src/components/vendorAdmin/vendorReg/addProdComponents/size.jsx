import { useState } from "react";
import css from "../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import add from "../../../../svg/Add.svg";
const Size = ({ setSizes, sizes }) => {
  const [savePriceForAll, setSavePriceForAll] = useState(true);
  const [savedPrice, setSavedPrice] = useState(0);
  const [isD, setIsD] = useState(false);
  const handleAddSize = () => {
    setSizes([...sizes, { weight: 0, volume: 0, price: 0 }]);
  };

  const handleRadioChange = () => {
    setIsD(!isD); // Toggle the radio button

    // Calculate the new price value
    const newPrice = isD ? 0 : sizes.length > 0 ? sizes[0].price : 0;

    // Update the saved price
    setSavedPrice(newPrice);

    // Update all sizes with the new price
    const updatedSizes = sizes.map((size) => ({
      ...size,
      price: newPrice,
    }));
    setSizes(updatedSizes);
  };

  const handleInputChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = parseFloat(value);
    if (savePriceForAll && field === "price") {
      // Якщо зберігання ціни для всіх ввімкнено, зберігаємо ціну для всіх розмірів
      setSavedPrice(parseFloat(value));
    }
    setSizes(updatedSizes);
  };
  return (
    <div className={css.newSize}>
      <label className={css.labelInpBold}>Unit size</label>
      <label className={css.newUnitDesc}>
        Use the weight bucket for products like soap and solid shampoo and
        volume for liquid products, like body wash and liquid dish soap.
      </label>
      <div className={css.secWrPDds}>
        <label className={css.grenLab}>Save price for all</label>
        <div className={css.chaWrnew}>
          <label className={css.checkTJ}>
            <input
              name={`rteyjj`} // Унікальний атрибут name для кожного чекбокса
              type="radio"
              className={css.check__checkOJ}
              checked={isD}
              // Один обробник для всіх чекбоксів
              onClick={handleRadioChange}
            />
            <span className={css.check__indicatorOJ}></span>
          </label>
        </div>
      </div>
      {sizes.map((size, index) => (
        <div key={index} className={css.wrapNewS}>
          <div className={css.weiNewWr}>
            <label className={css.labelInp}>Weight</label>
            <input
              className={css.inpWeig}
              type="number"
              placeholder="0.5"
              value={size.weight}
              onChange={(e) =>
                handleInputChange(index, "weight", e.target.value)
              }
            />
          </div>
          <div className={css.weiNewWr}>
            <label className={css.labelInp}>Volume</label>
            <input
              className={css.inpWeig}
              type="number"
              placeholder="15"
              value={size.volume}
              onChange={(e) =>
                handleInputChange(index, "volume", e.target.value)
              }
            />
          </div>
          <div className={css.weiNewWr}>
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
  );
};
export default Size;

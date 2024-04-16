import { useEffect, useState } from "react";
import css from "./product.module.css";
import ds from "../../svg/stickers.svg";
import { ReactSVG } from "react-svg";
import withMySQLData from "../HOK/withMySQLData";
import PopUpIngrid from "./popUpIngrid";
const Ingridient = ({ productData, data }) => {
  const [ingrid, setIngrid] = useState(null);
  const [matchedIngredients, setMatchedIngredients] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [openPop, setOpenPop] = useState(false);
  useEffect(() => {
    if (productData) {
      setIngrid(productData.ingredients.split(", ").map((item) => item.trim()));
    }
  }, [productData]);

  useEffect(() => {
    const findMatchedIngredients = () => {
      if (productData && data) {
        const matched = data.filter((item) =>
          productData.ingredients.includes(item.ingredient)
        );
        setMatchedIngredients(matched);
      }
    };

    findMatchedIngredients();
  }, [productData, data]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <div className={css.wrapIngridient}>
      <p className={css.nameIngr}>Ingredients</p>
      <div className={css.ingridList}>
        <div className={css.ingridL}>
          {matchedIngredients.length > 0 &&
            matchedIngredients.map((el, index) => {
              if (index < 10) {
                return (
                  <div
                    className={css.wrapIconIngrid}
                    key={index}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img className={css.iconsImage} alt="Icon" src={el.link} />
                    {hoveredIndex === index && (
                      <div className={css.hoveredText}>
                        <div className={css.textDivH}>
                          <div className={css.rotateDiv}></div>
                          <p className={css.tec}>{el.ingredient}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }
            })}
        </div>
        <p className={css.seaAll} onClick={() => setOpenPop(true)}>
          See All
        </p>
      </div>
      <ReactSVG src={ds} className={css.dsInIn} />
      {openPop && <PopUpIngrid setOpenPop={setOpenPop} ingrid={ingrid} />}
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/ingridients/icon`
)(Ingridient);

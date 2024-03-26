import { useEffect, useState } from "react";
import css from "./product.module.css";
import ds from "../../svg/stickers.svg";
import { ReactSVG } from "react-svg";
import withMySQLData from "../HOK/withMySQLData";
const Ingridient = ({ productData, data }) => {
  const [ingrid, setIngrid] = useState(null);
  const [matchedIngredients, setMatchedIngredients] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  useEffect(() => {
    if (productData) {
      setIngrid(productData.ingredients.split(", ").map((item) => item.trim()));
    }
  }, [productData]);
  console.log("matchedIngredients", matchedIngredients);

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
        <p className={css.seaAll}>See All</p>
      </div>
      <ReactSVG src={ds} className={css.dsInIn} />
    </div>
  );
};
export default withMySQLData("http://localhost:4000/api/v1/ingridients/icon")(
  Ingridient
);

import css from "./about.module.css";
import phyIcon from "../../svg/philosophyJkd.svg";
import { ReactSVG } from "react-svg";
import vfJ from "../../svg/Subtract.svg";
import ecoL from "../../svg/ecoL.svg";
const StandartC = () => {
  return (
    <div className={css.wrapStandartCriteria}>
      <ReactSVG src={phyIcon} />
      <p className={css.standartMaitP}>Standards & Criteria</p>
      <div className={css.wrapBigBlockIngrid}>
        <div className={css.iconWrText}>
          <div className={css.blockLikeIcon}>
            <ReactSVG src={vfJ} className={css.blockIconGreen} />
            <p className={css.numberS}>1</p>
          </div>
          <p className={css.titleSrP}>Ingredient Safety</p>
        </div>
        <div className={css.wrapCarefy}>
          <div className={css.wrapStIconBlockF}>
            <ReactSVG src={ecoL} className={css.ecoL} />
            <p className={css.descStad}>
              We carefully evaluate every ingredient to ensure it’s safe,
              effective, and has a minimal environmental impact. We prohibit
              ingredients deemed unsafe by the FDA, EU, and reputable
              researchers.
            </p>
          </div>
          <div className={css.wrapStIconBlockS}>
            <ReactSVG src={ecoL} className={css.ecoL} />
            <p className={css.descStad}>
              Ingredients associated with unsustainable and unfair practices,
              such as deforestation and child labor, are banned.
            </p>
          </div>
        </div>
      </div>
      <div className={css.wrapTwoBlocks}>
        <div className={css.wrapFormulation}>
          <div className={css.iconWrText}>
            <div className={css.blockLikeIcon}>
              <ReactSVG src={vfJ} className={css.blockIconGreen} />
              <p className={css.numberS}>2</p>
            </div>
            <p className={css.titleSrP}>Formulation Integrity</p>
          </div>
          <div className={css.wrapEnsd}>
            <ReactSVG src={ecoL} className={css.ecoL} />
            <p className={css.descStqw}>
              We ensure that each ingredient in the formulation complements
              others, creating a complete, stable, and safe product. We believe
              in providing everyone with access to better skincare while caring
              for our planet.
            </p>
          </div>
        </div>
        <div className={css.wrapFormulation}>
          <div className={css.iconWrText}>
            <div className={css.blockLikeIcon}>
              <ReactSVG src={vfJ} className={css.blockIconGreen} />
              <p className={css.numberS}>3</p>
            </div>
            <p className={css.titleSrP}>Packaging & Waste Reduction</p>
          </div>

          <div className={css.wrapEnsdCenter}>
            <ReactSVG src={ecoL} className={css.ecoL} />
            <p className={css.descStqw}>
              We review packaging materials and local recycling guidelines to
              offer customers an opportunity to opt for products that come in
              packaging that can be recycled where they live.
            </p>
          </div>
          <div className={css.wrapEnsd}>
            <ReactSVG src={ecoL} className={css.ecoL} />
            <p className={css.descStqw}>
              By offering products tailored to individual needs and sustainable
              packaging, we minimize waste generated from ineffective products
              and non-recyclable packaging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StandartC;

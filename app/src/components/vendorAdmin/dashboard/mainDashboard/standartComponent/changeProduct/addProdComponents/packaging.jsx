import css from "../../../../../vendorReg/vendorReg.module.css";

import { ReactSVG } from "react-svg";
import arrow from "../../../../../../../svg/chevron.svg";
import withMySQLData from "../../../../../../HOK/withMySQLData";
import { useEffect, useState } from "react";
const Packaging = ({
  data,
  setGlass,
  setMetal,
  setPaper,
  setPlastic,
  glass,
  paper,
  plastic,
  metal,
  productForChange,
}) => {
  const [selectedGlass, setSelectedGlass] = useState(null);
  const [selectedMetal, setSelectedMetal] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedPlastic, setSelectedPlastic] = useState(null);
  const [glassDisabled, setGlassDisabled] = useState(false);
  const [metalDisabled, setMetalDisabled] = useState(false);
  const [paperDisabled, setPaperDisabled] = useState(false);
  const [plasticDisabled, setPlasticDisabled] = useState(false);
  useEffect(() => {
    if (productForChange) {
      if (productForChange.glass) {
        const selectedGlass = data.find(
          (category) => category.name === productForChange.glass
        );

        setGlass(selectedGlass ? selectedGlass.id : null);
        setSelectedGlass(selectedGlass ? selectedGlass.id : null);
        setMetalDisabled(true);
        setPaperDisabled(true);
        setPlasticDisabled(true);
      }
      if (productForChange.metal) {
        const selectedMetal = data.find(
          (category) => category.name === productForChange.metal
        );
        setMetal(selectedMetal ? selectedMetal.id : null);
        setSelectedMetal(selectedMetal ? selectedMetal.id : null);
        setGlassDisabled(true);
        setPaperDisabled(true);
        setPlasticDisabled(true);
      }
      if (productForChange.paper_cardboard) {
        const selectedPaper = data.find(
          (category) => category.name === productForChange.paper_cardboard
        );
        setPaper(selectedPaper ? selectedPaper.id : null);
        setSelectedPaper(selectedPaper ? selectedPaper.id : null);
        setGlassDisabled(true);
        setMetalDisabled(true);
        setPlasticDisabled(true);
      }
      if (productForChange.recyclable_plastic) {
        const selectedPlastic = data.find(
          (category) => category.name === productForChange.recyclable_plastic
        );

        setPlastic(selectedPlastic ? selectedPlastic.id : null);
        setSelectedPlastic(selectedPlastic ? selectedPlastic.id : null);
        setGlassDisabled(false);
        setMetalDisabled(false);
        setPaperDisabled(false);
      }
    }
  }, [data, productForChange]);

  const handleGlassChange = (e) => {
    const g = e.target.value;
    setGlass(g);
    setSelectedGlass(g);
    if (g === "Select a packaging") {
      setMetalDisabled(false);
      setPaperDisabled(false);
      setPlasticDisabled(false);
    } else {
      setMetalDisabled(true);
      setPaperDisabled(true);
      setPlasticDisabled(true);
    }
  };
  const handleMetalChange = (e) => {
    const g = e.target.value;
    setMetal(g);
    setSelectedMetal(g);
    if (g === "Select a packaging") {
      setGlassDisabled(false);
      setPaperDisabled(false);
      setPlasticDisabled(false);
    } else {
      setGlassDisabled(true);
      setPaperDisabled(true);
      setPlasticDisabled(true);
    }
  };
  const handlePaperChange = (e) => {
    const g = e.target.value;
    setPaper(g);
    setSelectedPaper(g);
    if (g === "Select a packaging") {
      setGlassDisabled(false);
      setMetalDisabled(false);
      setPlasticDisabled(false);
    } else {
      setGlassDisabled(true);
      setMetalDisabled(true);
      setPlasticDisabled(true);
    }
  };
  const handlePlasticChange = (e) => {
    const g = e.target.value;

    setPlastic(g);
    setSelectedPlastic(g);
    if (g === "Select a packaging") {
      setGlassDisabled(false);
      setMetalDisabled(false);
      setPaperDisabled(false);
    } else {
      setGlassDisabled(true);
      setMetalDisabled(true);
      setPaperDisabled(true);
    }
  };
  return (
    <div className={css.priceWrapRightPak}>
      <label className={css.labelInpBold}>Packaging</label>
      <div className={css.priceWrapBig}>
        <label className={css.labelInp}>Glass</label>
        <div className={css.wrapPriceInput}>
          <div className={css.wrapSelectF}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handleGlassChange}
              value={selectedGlass}
              disabled={glassDisabled}
            >
              <option value={null}>Select a packaging</option>
              {data.map((el, index) => {
                if (el.category_id === 1) {
                  return (
                    <option key={index} value={el.id}>
                      {el.name}
                    </option>
                  );
                }
              })}
            </select>
            <ReactSVG className={css.customArrowSelect} src={arrow} />
          </div>
        </div>
      </div>
      <div className={css.priceWrapBig}>
        <label className={css.labelInp}>Metal</label>
        <div className={css.wrapPriceInput}>
          <div className={css.wrapSelectF}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handleMetalChange}
              value={selectedMetal}
              disabled={metalDisabled}
            >
              <option value={null}>Select a packaging</option>
              {data.map((el, index) => {
                if (el.category_id === 2) {
                  return (
                    <option key={index} value={el.id}>
                      {el.name}
                    </option>
                  );
                }
              })}
            </select>
            <ReactSVG className={css.customArrowSelect} src={arrow} />
          </div>
        </div>
      </div>
      <div className={css.priceWrapBig}>
        <label className={css.labelInp}>Paper & Cardboard</label>

        <div className={css.wrapPriceInput}>
          <div className={css.wrapSelectF}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handlePaperChange}
              value={selectedPaper}
              disabled={paperDisabled}
            >
              <option value={null}>Select a packaging</option>
              {data.map((el, index) => {
                if (el.category_id === 3) {
                  return (
                    <option key={index} value={el.id}>
                      {el.name}
                    </option>
                  );
                }
              })}
            </select>
            <ReactSVG className={css.customArrowSelect} src={arrow} />
          </div>
        </div>
      </div>
      <div className={css.priceWrapBig}>
        <label className={css.labelInp}>Recyclable plastic</label>

        <div className={css.wrapPriceInput}>
          <div className={css.wrapSelectF}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handlePlasticChange}
              value={selectedPlastic}
              disabled={plasticDisabled}
            >
              <option value={null}>Select a packaging</option>
              {data.map((el, index) => {
                if (el.category_id === 4) {
                  return (
                    <option key={index} value={el.id}>
                      {el.name}
                    </option>
                  );
                }
              })}
            </select>
            <ReactSVG className={css.customArrowSelect} src={arrow} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/product/packaging`
)(Packaging);

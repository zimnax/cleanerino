// import css from "../vendorReg.module.css";
// import { ReactSVG } from "react-svg";
// import arrow from "../../../../svg/chevron.svg";
// import withMySQLData from "../../../HOK/withMySQLData";
// import { useState } from "react";
// const Packaging = ({ data, setGlass, setMetal, setPaper, setPlastic }) => {
//   const handleGlassChange = (e) => {
//     const g = e.target.value;
//     setGlass(g);
//   };
//   const handleMetalChange = (e) => {
//     const g = e.target.value;
//     setMetal(g);
//   };
//   const handlePaperChange = (e) => {
//     const g = e.target.value;
//     setPaper(g);
//   };
//   const handlePlasticChange = (e) => {
//     const g = e.target.value;
//     setPlastic(g);
//   };
//   return (
//     <div className={css.priceWrapRightPak}>
//       <label className={css.labelInpBold}>Packaging</label>
//       <div className={css.priceWrapBig}>
//         <label className={css.labelInp}>Glass</label>
//         <div className={css.wrapPriceInput}>
//           <div className={css.wrapSelectFNotT}>
//             <select
//               className={css.proceInputBigSelectBig}
//               onChange={handleGlassChange}
//             >
//               <option value={null}>Select a packaging</option>
//               {data.map((el, index) => {
//                 if (el.category_id === 1) {
//                   return (
//                     <option key={index} value={el.id}>
//                       {el.name}
//                     </option>
//                   );
//                 }
//               })}
//             </select>
//             <ReactSVG className={css.customArrowSelect} src={arrow} />
//           </div>
//         </div>
//       </div>
//       <div className={css.priceWrapBig}>
//         <label className={css.labelInp}>Metal</label>
//         <div className={css.wrapPriceInput}>
//           <div className={css.wrapSelectFNotT}>
//             <select
//               className={css.proceInputBigSelectBig}
//               onChange={handleMetalChange}
//             >
//               <option value={null}>Select a packaging</option>
//               {data.map((el, index) => {
//                 if (el.category_id === 2) {
//                   return (
//                     <option key={index} value={el.id}>
//                       {el.name}
//                     </option>
//                   );
//                 }
//               })}
//             </select>
//             <ReactSVG className={css.customArrowSelect} src={arrow} />
//           </div>
//         </div>
//       </div>
//       <div className={css.priceWrapBig}>
//         <label className={css.labelInp}>Paper & Cardboard</label>

//         <div className={css.wrapPriceInput}>
//           <div className={css.wrapSelectFNotT}>
//             <select
//               className={css.proceInputBigSelectBig}
//               onChange={handlePaperChange}
//             >
//               <option value={null}>Select a packaging</option>
//               {data.map((el, index) => {
//                 if (el.category_id === 3) {
//                   return (
//                     <option key={index} value={el.id}>
//                       {el.name}
//                     </option>
//                   );
//                 }
//               })}
//             </select>
//             <ReactSVG className={css.customArrowSelect} src={arrow} />
//           </div>
//         </div>
//       </div>
//       <div className={css.priceWrapBig}>
//         <label className={css.labelInp}>Recyclable plastic</label>

//         <div className={css.wrapPriceInput}>
//           <div className={css.wrapSelectFNotT}>
//             <select
//               className={css.proceInputBigSelectBig}
//               onChange={handlePlasticChange}
//             >
//               <option value={null}>Select a packaging</option>
//               {data.map((el, index) => {
//                 if (el.category_id === 4) {
//                   return (
//                     <option key={index} value={el.id}>
//                       {el.name}
//                     </option>
//                   );
//                 }
//               })}
//             </select>
//             <ReactSVG className={css.customArrowSelect} src={arrow} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default withMySQLData(
//   "http://localhost:4000/api/v1/vendor/product/packaging"
// )(Packaging);
import css from "../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../../../svg/chevron.svg";
import withMySQLData from "../../../HOK/withMySQLData";
import { useState } from "react";

const Packaging = ({ data, setGlass, setMetal, setPaper, setPlastic }) => {
  const [glassDisabled, setGlassDisabled] = useState(false);
  const [metalDisabled, setMetalDisabled] = useState(false);
  const [paperDisabled, setPaperDisabled] = useState(false);
  const [plasticDisabled, setPlasticDisabled] = useState(false);

  const handleGlassChange = (e) => {
    const g = e.target.value;
    console.log("ggggg", g);
    setGlass(g);
    // При виборі Glass робимо інші селекти неактивними
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
          <div className={css.wrapSelectFNotT}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handleGlassChange}
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
          <div className={css.wrapSelectFNotT}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handleMetalChange}
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
          <div className={css.wrapSelectFNotT}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handlePaperChange}
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
          <div className={css.wrapSelectFNotT}>
            <select
              className={css.proceInputBigSelectBig}
              onChange={handlePlasticChange}
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
  "http://88.218.188.44:4000/api/v1/vendor/product/packaging"
)(Packaging);

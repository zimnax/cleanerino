import css from "../vendorProductSt.module.css";

const Returns = ({ setReturnsOnProf, returnsOnProf }) => {
  const handleRadioChange = () => {
    setReturnsOnProf(!returnsOnProf);
  };
  return (
    <div className={css.wrapPabAnfSet}>
      <p className={css.venDescTop}>Payment information</p>
      <div className={css.wrapRetutnsAndRef}>
        <p className={css.returnsAdnP}>Returns & Refunds</p>{" "}
        <div className={css.chaWr}>
          <label className={css.check} onClick={handleRadioChange}>
            <input
              name="freShi"
              type="radio"
              className={css.check__check}
              checked={returnsOnProf}
              onChange={() => {}} // Порожня функція, щоб уникнути помилок
            />
            <span className={css.check__indicator}></span>
          </label>
          {!returnsOnProf && <p className={css.of}>Off</p>}
          {returnsOnProf && <p className={css.on}>On</p>}
        </div>
      </div>
    </div>
  );
};
export default Returns;

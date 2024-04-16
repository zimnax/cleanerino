import css from "../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../../../svg/chevron.svg";
import withMySQLData from "../../../HOK/withMySQLData";
const PayoutDet = ({ data, setPayaut }) => {
  const handleSelectChange = (event) => {
    const selectedBrandId = event.target.value;
    console.log(selectedBrandId);
    setPayaut(selectedBrandId);
  };
  return (
    <div className={css.selectWr}>
      <label className={css.labelInp}>Payout details</label>
      <div className={css.wrapSelectF}>
        <select
          className={css.brandSelect}
          onChange={handleSelectChange}
          name="payout_details_id"
        >
          {data &&
            data.map((el, index) => {
              return (
                <option key={el.id} value={el.id}>
                  {el.name}
                </option>
              );
            })}
        </select>
        <ReactSVG className={css.customArrowSelect} src={arrow} />
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/det/payout`
)(PayoutDet);

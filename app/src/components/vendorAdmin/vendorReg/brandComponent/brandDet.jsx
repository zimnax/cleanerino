import css from "../vendorReg.module.css";
import { ReactSVG } from "react-svg";
import arrow from "../../../../svg/chevron.svg";
import withMySQLData from "../../../HOK/withMySQLData";
const BrandDet = ({ data, setBrandIs, myBrandError, setMyBrandError }) => {
  const handleSelectChange = (event) => {
    const selectedBrandId = event.target.value;

    setBrandIs(selectedBrandId);
    setMyBrandError(true);
  };
  return (
    <div className={css.selectWr}>
      <label className={myBrandError ? css.labelInp : css.labelInpNot}>
        My brand is
      </label>
      <div className={css.wrapSelectF}>
        <select
          className={myBrandError ? css.brandSelect : css.brandSelectNot}
          onChange={handleSelectChange}
          name="my_brand_id"
        >
          <option value="" disabled selected>
            Select
          </option>
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
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/det/brand`
)(BrandDet);

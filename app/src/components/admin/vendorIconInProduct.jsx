import css from "./vendorProductSt.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactSVG } from "react-svg";
import backTOLi from "../../svg/backToVenList.svg";
import { useNavigate } from "react-router-dom";

const VendorIconInProduct = ({ id }) => {
  const navigate = useNavigate();
  const [vendorData, setVendorData] = useState(null);
  console.log("vendorData", vendorData);
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${id}`
        );
        setVendorData(response.data);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      }
    };

    if (id) {
      fetchVendorData();
    }
  }, [id]);
  return (
    <div className={css.vendorIconInWrap}>
      <ReactSVG
        src={backTOLi}
        className={css.backToVendorList}
        onClick={() => navigate("/admin/vendors")}
      />
      <div className={css.wrapNameIcon}>
        {vendorData && vendorData.photo && (
          <img className={css.iconVendor} src={vendorData.photo} />
        )}

        {vendorData && !vendorData.photo && (
          <div className={css.withoutPhoto}>{vendorData.last_name[0]}</div>
        )}
      </div>
      {vendorData && (
        <p className={css.nameVendor}>
          {vendorData.first_name}&nbsp; {vendorData.last_name}
        </p>
      )}
    </div>
  );
};
export default VendorIconInProduct;

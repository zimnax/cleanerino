import css from "./productList.module.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
const VendorsProd = ({ vendorId }) => {
  const [vendor, setVendor] = useState(null);

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${vendorId}`
        );
        setVendor(response.data);
      } catch (err) {}
    };

    fetchVendorProfile();
  }, [vendorId]);
  return (
    <>
      {vendor && (
        <td className={css.tdClassProd}>
          {vendor.photo && (
            <img className={css.imageInStat} src={vendor.photo} />
          )}
          {vendor.first_name}
        </td>
      )}
    </>
  );
};
export default VendorsProd;

import { useParams } from "react-router-dom";
import css from "./vendor.module.css";
import Header from "../standartComponent/header";
import VendorDescription from "./vendorDescription";
import withMySQLData from "../HOK/withMySQLData";
import { useEffect, useState } from "react";
import VendorProd from "./vendorProd";

const VendorPage = ({ data }) => {
  let params = useParams();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    console.log(typeof params.id);
    if (params && data) {
      const found = data.find((item) => item.id === parseFloat(params.id));

      setUsers(found);
    }
  }, [data, params]);
  console.log("users", users);
  return (
    <div className={css.allWrap}>
      <Header />
      <VendorDescription users={users} />
      <VendorProd />
    </div>
  );
};
export default withMySQLData("http://localhost:4000/api/v1/vendor/profile")(
  VendorPage
);

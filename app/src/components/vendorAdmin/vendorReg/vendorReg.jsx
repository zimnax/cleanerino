import { useEffect, useState } from "react";
import css from "./vendorReg.module.css";
import VendorRegPage from "./vendorRegPage";
import AddBrandDetails from "./addBrandDetails";
import AddProduct from "./addProduct";
import Test from "./tesx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import withMySQLData from "../../HOK/withMySQLData";

const VendorReg = ({ activeUser, data }) => {
  const [reg, setReg] = useState(true);
  const [brandPage, setBrandPage] = useState(false);
  const [addProdPage, setAddProdPage] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data && activeUser) {
      // Пошук об'єкта, де firebase_id === activeUser.uid
      const found = data.find((item) => item.firebase_id === activeUser.uid);

      // Оновлення стану знайденого об'єкта
      setUsers(found);
    }
  }, [data, activeUser]);

  return (
    <>
      {reg && (
        <VendorRegPage
          setReg={setReg}
          setBrandPage={setBrandPage}
          activeUser={activeUser}
        />
      )}
      {brandPage && (
        <AddBrandDetails
          setBrandPage={setBrandPage}
          setAddProdPage={setAddProdPage}
          activeUser={activeUser}
        />
      )}
      {addProdPage && (
        <AddProduct setAddProdPage={setAddProdPage} activeUser={activeUser} />
      )}
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}:4000/api/v1/vendor/profile`
)(VendorReg);

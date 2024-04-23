import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";
import HeaderModernWhite from "../standartComponent/headerModernWhite";
import css from "./checkout.module.css";
import FirstBlockCheck from "./firstBlockCheck";
import SecondBlockCheck from "./secondBlockCheck";
import axios from "axios";
import Footer from "../standartComponent/footer";
const Checkout = ({ totalQuantity, activeUser, data }) => {
  const [users, setUsers] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  useEffect(() => {
    if (activeUser === "") {
    }
    if (activeUser && data && data.users) {
      const found = data.users.find(
        (item) => item.firebaseId === activeUser.uid
      );

      if (found) {
        setUsers(found);
      } else {
        // signOutUser();
        // window.location.href = "/signin";
      }
    }
  }, [data, activeUser]);
  const [taxAmount, setTaxAmount] = useState(null);

  const calculateTax = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/taxcalc`,
        {
          amount: subtotal,
          address: {
            line1: "61 Fountain st",
            city: "Framingham",
            state: "MA",
            postal_code: "01702",
            country: "US",
          },
        }
      );
      console.log(
        "response.data.calculation.taxAmount",
        response.data.calculation
      );
      setTaxAmount(response.data.calculation.amount_total - subtotal);
    } catch (error) {
      console.error("Error calculating tax:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/pay`
      );
      const { sessionId } = response.data;
      // Redirect user to Stripe Checkout page
      window.location = `https://checkout.stripe.com/pay/${sessionId}`;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };
  return (
    <>
      <HeaderModernWhite
        activeUser={activeUser}
        totalQuantity={totalQuantity}
      />
      <div className={css.checkOutWrap}>
        <button onClick={handleCheckout}>fsjlfkgsdfgsdfg</button>
        <div className={css.smallWrapCheck}>
          <FirstBlockCheck users={users} />
          <SecondBlockCheck setSubtotal={setSubtotal} subtotal={subtotal} />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(Checkout);

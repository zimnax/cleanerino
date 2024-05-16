import { useEffect, useState } from "react";
import withMySQLData from "../HOK/withMySQLData";
import HeaderModernWhite from "../standartComponent/headerModernWhite";
import css from "./checkout.module.css";
import FirstBlockCheck from "./firstBlockCheck";
import SecondBlockCheck from "./secondBlockCheck";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import Footer from "../standartComponent/footer";
import Swal from "sweetalert2";
const Checkout = ({ totalQuantity, activeUser, data }) => {
  const [users, setUsers] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [prodInCart, setProdInCart] = useState(null);
  const [line, setLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [tax, setTax] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [groupProduct, setGroupProduct] = useState(null);
  const [allPostPay, setAllPostPay] = useState(null);
  const [totalShip, setTotalShip] = useState(null);
  const [fullTotalPriceR, setFullTotalPriceR] = useState();
  const [address, setAddress] = useState(null);
  const [combineProd, setCombineProd] = useState(null);
  useEffect(() => {
    const allE = tax + totalShip + subtotal;
    setFullTotalPriceR(allE);
  }, [tax, totalShip, subtotal]);
  useEffect(() => {
    if (allPostPay) {
      const totalAmount = allPostPay
        .map((post) => parseFloat(post.amount))
        .reduce((total, amount) => total + amount, 0);
      setTotalShip(totalAmount);
    }
  }, [allPostPay]);

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

  const groupProductsByVendorId = (products) => {
    const groupedProducts = [];
    const vendorIds = []; // Для відстеження унікальних vendorId

    products.forEach((product) => {
      const { vendorId } = product;
      const index = vendorIds.indexOf(vendorId);
      if (index === -1) {
        // Якщо vendorId ще не був доданий до масиву
        vendorIds.push(vendorId);
        groupedProducts.push([product]);
      } else {
        // Якщо vendorId вже присутній у масиві
        groupedProducts[index].push(product);
      }
    });

    return groupedProducts;
  };

  useEffect(() => {
    if (prodInCart && prodInCart.length > 0) {
      const groupedProducts = groupProductsByVendorId(prodInCart);
      setGroupProduct(groupedProducts);
    }
  }, [prodInCart]);

  const calculateTax = async (line, city, state, zipCode, country) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/taxcalc`,
        {
          amount: subtotal,
          address: {
            line1: line,
            city: city,
            state: state,
            postal_code: zipCode,
            country: country,
          },
        }
      );

      setTax(response.data.calculation.amount_total - subtotal);
    } catch (error) {
      if (error.response) {
        // Помилка відповіді від сервера (HTTP статус код не в діапазоні 2xx)
        const errorMessage =
          error.response.data.error ||
          "An error occurred while processing the request.";
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage,
        });
      } else if (error.request) {
        // Помилка відправлення запиту (немає відповіді від сервера)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No response from the server. Please check your connection or try again later.",
        });
      } else {
        // Інші помилки (наприклад, помилки в коді або мережеві помилки)
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An unknown error occurred. Please try again later or contact the administrator.",
        });
      }
    }
  };

  useEffect(() => {
    if (allPostPay && groupProduct) {
      const combinedProducts = groupProduct.map((vendorProducts) => {
        const vendorId = vendorProducts[0].vendorId;
        const vendorShipping = allPostPay.find(
          (post) => post.vendorId === vendorId
        );

        const vendorCombined = vendorProducts.map((product) => ({
          ...product,
          shipping: vendorShipping,
        }));

        return vendorCombined;
      });
      setCombineProd(combinedProducts);
    }
  }, [allPostPay, groupProduct]);

  const handleCheckout = async (prodInCart, delivery) => {
    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY);
    try {
      if (!address || !combineProd) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Please provide a delivery address and select all shipping methods.",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/pay`,
        {
          products: prodInCart.map((product) => ({
            name: product.product_name,
            description: product.short_description,
            images: product.files[0].file,
            unit_amount: product.price * 100,
            quantity: product.quantity,
          })),
          deliveryCost: delivery,
          tax: tax,
          combineProd: JSON.stringify(combineProd),
          address: address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { sessionId } = response.data;
      // Redirect user to Stripe Checkout page

      const result = stripe.redirectToCheckout({
        sessionId: sessionId,
      });
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
        {/* <button onClick={handleCheckout}>fsjlfkgsdfgsdfg</button> */}
        <div className={css.smallWrapCheck}>
          <FirstBlockCheck
            users={users}
            line={line}
            setLine={setLine}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zipCode={zipCode}
            setZipCode={setZipCode}
            country={country}
            setCountry={setCountry}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            calculateTax={calculateTax}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
            groupProduct={groupProduct}
            phone={phone}
            setPhone={setPhone}
            setAllPostPay={setAllPostPay}
            allPostPay={allPostPay}
            handleCheckout={handleCheckout}
            prodInCart={prodInCart}
            totalShip={totalShip}
            address={address}
            setAddress={setAddress}
          />
          <SecondBlockCheck
            setSubtotal={setSubtotal}
            subtotal={subtotal}
            setProdInCart={setProdInCart}
            prodInCart={prodInCart}
            tax={tax}
            allPostPay={allPostPay}
            totalShip={totalShip}
            fullTotalPriceR={fullTotalPriceR}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(Checkout);

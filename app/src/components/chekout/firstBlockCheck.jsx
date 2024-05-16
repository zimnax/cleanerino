import { useState } from "react";
import css from "./checkout.module.css";
import Shiping from "./shiping";
import { ReactSVG } from "react-svg";
import addNewAdd from "../../svg/addNewAddress.svg";
import AddAddressToSend from "./addAddressToSend";
import Gifts from "./gifts";
import OneSectionVend from "./oneSectionVend";
import product from "../product/product";
const FirstBlockCheck = ({
  users,
  line,
  setLine,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
  name,
  setName,
  email,
  setEmail,
  calculateTax,
  selectedAddress,
  setSelectedAddress,
  groupProduct,
  phone,
  setPhone,
  setAllPostPay,
  allPostPay,
  handleCheckout,
  prodInCart,
  totalShip,
  address,
  setAddress,
}) => {
  const [publicProf, setPublicProf] = useState(true);
  const [brand, setBrand] = useState(false);
  const [addAddress, setAddAddress] = useState(false);

  const handleItemClick = (setter) => {
    setPublicProf(false);
    setBrand(false);

    setter(true);
  };
  const addShipAddress = () => {
    setAddAddress(!addAddress);
  };
  return (
    <div className={css.firstBlockCheckWrap}>
      <p className={css.pCheckOut}>Checkout</p>
      <ul className={css.profileUl}>
        <li
          className={
            publicProf
              ? `${css.profileLi} ${css.profileLiActive}`
              : css.profileLi
          }
          onClick={() => handleItemClick(setPublicProf)}
        >
          Shipping
        </li>
        <li
          className={
            brand ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setBrand)}
        >
          Self Pickup
        </li>
      </ul>
      {publicProf && (
        <Shiping
          users={users}
          calculateTax={calculateTax}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          address={address}
          setAddress={setAddress}
        />
      )}
      <div className={css.addNewAddress} onClick={addShipAddress}>
        <ReactSVG src={addNewAdd} className={css.addNewAdd} />
        Add Address
      </div>
      {addAddress && (
        <AddAddressToSend
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
          setAddress={setAddress}
          phone={phone}
          setPhone={setPhone}
          users={users}
        />
      )}
      {groupProduct &&
        groupProduct.map((oneProd, index) => {
          return (
            <OneSectionVend
              oneProd={oneProd}
              key={index}
              address={address}
              setAllPostPay={setAllPostPay}
              allPostPay={allPostPay}
              index={index}
              handleCheckout={handleCheckout}
            />
          );
        })}
      <div
        className={css.buttonOrderAll}
        onClick={() => handleCheckout(prodInCart, totalShip)}
      >
        Pay for Order
      </div>
      {/* <Gifts /> */}
    </div>
  );
};
export default FirstBlockCheck;

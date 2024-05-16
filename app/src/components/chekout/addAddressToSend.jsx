import { useState } from "react";
import css from "./checkout.module.css";
const AddAddressToSend = ({
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
  setAddress,
  phone,
  setPhone,
  users,
}) => {
  const calcWithNew = () => {
    calculateTax(line, city, state, zipCode, country);
    setSelectedAddress(null);
    setAddress({
      name: name,
      street1: line,
      city: city,
      state: state,
      zip: zipCode,
      country: country,
      phone: phone,
      email: email,
      id: users ? users.id : null,
    });
  };
  console.log(users);
  return (
    <div className={css.wrapAddNewAddres}>
      <p className={css.pInNewAddress}>SHIPPING & BILLING INFORMATION</p>
      <div className={css.wrapAllInputs}>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>Name</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>Email</div>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>Phone</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>Address</div>
          <input
            value={line}
            onChange={(e) => setLine(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>City</div>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>State</div>
          <input
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={css.inputNewSmall}
            placeholder="Placeholder"
          />
          <div className={css.nameInput}>Zip</div>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={css.inputNewSmall}
            placeholder="556569"
          />
        </div>
        <div className={css.wrapInputInAddMain}>
          <div className={css.nameInput}>Country</div>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={css.inputNewBig}
            placeholder="Placeholder"
          />
        </div>
      </div>
      <div className={css.shipThisAddressButton} onClick={calcWithNew}>
        Ship to this address
      </div>
    </div>
  );
};
export default AddAddressToSend;

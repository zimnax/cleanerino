import { useState } from "react";
import css from "./checkout.module.css";
const AddAddressToSend = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
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
          <div className={css.nameInput}>Address</div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
            value={zip}
            onChange={(e) => setZip(e.target.value)}
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
      <div className={css.shipThisAddressButton}>Ship to this address</div>
    </div>
  );
};
export default AddAddressToSend;

import { useEffect, useState } from "react";
import css from "./cabinet.module.css";
import axios from "axios";
const EditAddress = ({ editData, setEditAdress, setUsers }) => {
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  useEffect(() => {
    setStreet(editData.street);
    setApartment(editData.apartment);
    setCity(editData.city);
    setState(editData.state);
    setZipCode(editData.zip_code);
  }, [editData]);
  const handleSaveAddress = () => {
    const updatedAddress = {
      street: street,
      apartment: apartment,
      city: city,
      state: state,
      zip_code: zipCode,
    };

    axios
      .put(
        `${process.env.REACT_APP_API_URL}:4000/api/v1/users/address/${editData.address_id}`,
        updatedAddress
      )
      .then((response) => {
        setUsers((prevUsers) => {
          // Створюємо новий об'єкт користувача з оновленими даними адреси
          const updatedUser = {
            ...prevUsers,
            addresses: prevUsers.addresses.map((address) =>
              address.address_id === editData.address_id
                ? { ...address, ...updatedAddress }
                : address
            ),
          };
          return updatedUser;
        });
        alert("Address updated successfully!");
        setEditAdress(false);
        // Додайте код для оновлення інтерфейсу користувача або навігації
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        alert("Error updating address. Please try again.");
      });
  };
  return (
    <div className={css.feirstNameWr}>
      <div className={css.wrapText}>
        <p className={css.mainTextP}>Mailing address</p>
        <p className={css.secondText}>Commodo morbi egestas gravida risus</p>
      </div>
      <div className={css.inputWithTextWrap}>
        <div className={css.smalInpWrapSet}>
          <p className={css.fullNameP}>Street address</p>
          <input
            className={css.nameInput}
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div className={css.smalInpWrapSet}>
          <p className={css.fullNameP}>Apartment/Unit </p>
          <input
            className={css.nameInput}
            value={apartment}
            onChange={(e) => setApartment(e.target.value)}
          />
        </div>
        <div className={css.smalInpWrapSet}>
          <p className={css.fullNameP}>City</p>
          <input
            className={css.nameInput}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className={css.smalInpWrapSet}>
          <p className={css.fullNameP}>State</p>
          <input
            className={css.nameInput}
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className={css.smalInpWrapSet}>
          <p className={css.fullNameP}>Zipcode</p>
          <input
            className={css.nameInput}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <button className={css.addNewAdressT} onClick={handleSaveAddress}>
          Add changes
        </button>
      </div>
    </div>
  );
};
export default EditAddress;

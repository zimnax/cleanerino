import { useEffect, useRef, useState } from "react";
import css from "./cabinet.module.css";
import logoRec from "../../img/Rectangle4.png";
import { ReactSVG } from "react-svg";
import upload from "../../svg/upload.svg";
import axios from "axios";
import EditAddress from "./editAddress";
const ShipingAdress = ({
  street,
  setStreet,
  apartment,
  setApartment,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  users,
  setUsers,
}) => {
  const [openAddAdsress, setOpenAddAdsress] = useState(false);
  const [editAdress, setEditAdress] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleSaveAddress = () => {
    // Перевірка чи всі поля введені
    if (!street || !city || !state || !zipCode) {
      alert("Будь ласка, заповніть всі поля");
      return;
    }

    // Отримання ідентифікатора користувача
    const userId = users.id;

    // Відправка даних на сервер
    axios
      .post(`${process.env.REACT_APP_API_URL}:4000/api/v1/users/address`, {
        user_id: userId,
        street: street,
        apartment: apartment,
        city: city,
        state: state,
        zip_code: zipCode,
      })
      .then((response) => {
        console.log(response.data);
        alert("Адреса успішно додана");
        // Очищення полів вводу після успішного додавання
        setStreet("");
        setApartment("");
        setCity("");
        setState("");
        setZipCode("");
      })
      .catch((error) => {
        console.error("Помилка при додаванні адреси:", error);
        alert("Помилка при додаванні адреси. Будь ласка, спробуйте знову.");
      });
  };
  const changeData = (el) => {
    setEditData(el);
    setEditAdress(true);
  };
  const backToAdr = () => {
    setEditAdress(false);
  };
  return (
    <div className={css.wrapPabAnfSet}>
      {!openAddAdsress && !editAdress && (
        <button
          className={css.addNewAdress}
          onClick={() => setOpenAddAdsress(true)}
        >
          Add New Address
        </button>
      )}
      {editAdress && (
        <button className={css.addNewAdress} onClick={backToAdr}>
          Back to address
        </button>
      )}
      {openAddAdsress && !editAdress && (
        <button
          className={css.addNewAdress}
          onClick={() => setOpenAddAdsress(false)}
        >
          Back to address{" "}
        </button>
      )}
      {!openAddAdsress && (
        <div className={css.wrapAllAdressAll}>
          {users &&
            users.addresses &&
            users.addresses.length > 0 &&
            users.addresses.map((el, index) => {
              return (
                <>
                  {!editAdress && (
                    <div className={css.oneAdressWrap} key={index}>
                      <div className={css.wrapAdInform}>
                        <p className={css.pAddWithSpan}>
                          <span className={css.pAddWithSpanMain}>
                            Street:&nbsp;
                          </span>
                          {el.street}
                        </p>
                        <p className={css.pAddWithSpan}>
                          <span className={css.pAddWithSpanMain}>
                            City:&nbsp;
                          </span>{" "}
                          {el.city}
                        </p>
                        <p className={css.pAddWithSpan}>
                          <span className={css.pAddWithSpanMain}>
                            State:&nbsp;
                          </span>
                          {el.state}
                        </p>
                        <p className={css.pAddWithSpan}>
                          <span className={css.pAddWithSpanMain}>
                            Zip:&nbsp;
                          </span>
                          {el.zip_code}
                        </p>
                      </div>
                      <p className={css.editPd} onClick={() => changeData(el)}>
                        EDIT
                      </p>
                    </div>
                  )}
                </>
              );
            })}
        </div>
      )}
      {editAdress && (
        <EditAddress
          editData={editData}
          setEditAdress={setEditAdress}
          setUsers={setUsers}
        />
      )}
      {openAddAdsress && (
        <div className={css.feirstNameWr}>
          <div className={css.wrapText}>
            <p className={css.mainTextP}>Mailing address</p>
            <p className={css.secondText}>
              Commodo morbi egestas gravida risus
            </p>
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
              Save New Address
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ShipingAdress;

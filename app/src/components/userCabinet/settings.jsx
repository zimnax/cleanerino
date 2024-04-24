import { useEffect, useState } from "react";
import css from "./cabinet.module.css";
import ProfAndSet from "./profAndSet";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import ShipingAdress from "./shipingAdress";
import NewsSe from "./newsSe";
import Swal from "sweetalert2";
const Settings = ({ users, setUsers }) => {
  const [publicProf, setPublicProf] = useState(true);
  const [shipSt, setShipSt] = useState(false);
  const [comunication, setComunication] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [logoT, setLogoT] = useState(null);
  const [loading, setLoading] = useState(false);
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  useEffect(() => {
    if (users) {
      setName(users.user_name);
      setEmail(users.email);
      setPhone(users.phone);
    }
  }, [users]);
  const handleItemClick = (setter) => {
    setPublicProf(false);
    setShipSt(false);
    setComunication(false);
    setter(true);
  };
  const sendDataToServer = async (event) => {
    event.preventDefault(); // Щоб уникнути перезавантаження сторінки
    setLoading(true);
    const form = event.target;
    const data = new FormData();
    const formDataObj = Object.fromEntries(data.entries());
    formDataObj.user_name = name;
    formDataObj.email = email;
    formDataObj.phone = phone;

    try {
      let url;
      if (logoT) {
        // Відправка файлу на сервер
        const fileFormData = new FormData();
        fileFormData.append("file", logoT);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/user/file/${users.id}`, // URL для завантаження файлу
          fileFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Отримання URL завантаженого файлу
        url = fileResponse.data.url;
      }

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/users/profile/${users.id}`, // Потрібно замінити userId на відповідний id користувача
        formDataObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response && response.statusText === "OK") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Data Updated",
          text: "Data successfully updated",
          confirmButtonColor: "#609966",
        });
      }
      // Додайте тут логіку для обробки успішної відправки даних
    } catch (error) {
      console.error("Error sending data:", error);
      Swal.fire({
        icon: "error",
        title: "Data Update Failed",
        text: error.message, // Передаємо повідомлення про помилку
        confirmButtonColor: "#609966",
      });
      // Додайте тут логіку для обробки помилки відправки даних
    }
  };

  return (
    <div className={css.wrapAllSettings}>
      <div className={css.wrapButtonWithName}>
        <p className={css.pMainInSet}>Welcome, Esther Howard</p>
        <div className={css.wrapTwoButton}>
          <button className={css.buttonCancel}>Cancel</button>
          <button className={css.buttonSave} onClick={sendDataToServer}>
            Save
          </button>
        </div>
      </div>
      <ul className={css.profileUl}>
        <li
          className={
            publicProf
              ? `${css.profileLi} ${css.profileLiActive}`
              : css.profileLi
          }
          onClick={() => handleItemClick(setPublicProf)}
        >
          Public Profile
        </li>
        <li
          className={
            shipSt ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setShipSt)}
        >
          Shipping address
        </li>
        <li
          className={
            comunication
              ? `${css.profileLi} ${css.profileLiActive}`
              : css.profileLi
          }
          onClick={() => handleItemClick(setComunication)}
        >
          Communication preferences.
        </li>
      </ul>
      {publicProf && (
        <ProfAndSet
          users={users}
          setName={setName}
          name={name}
          setPhoto={setPhoto}
          photo={photo}
          setEmail={setEmail}
          email={email}
          setPhone={setPhone}
          phone={phone}
          logoT={logoT}
          setLogoT={setLogoT}
        />
      )}
      {shipSt && (
        <ShipingAdress
          street={street}
          setStreet={setStreet}
          apartment={apartment}
          setApartment={setApartment}
          city={city}
          setCity={setCity}
          state={state}
          setState={setState}
          zipCode={zipCode}
          setZipCode={setZipCode}
          users={users}
          setUsers={setUsers}
        />
      )}
      {comunication && <NewsSe users={users} />}
      {loading && (
        <div className={css.spinerWrap}>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};
export default Settings;

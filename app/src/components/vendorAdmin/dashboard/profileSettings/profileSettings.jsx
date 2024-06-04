import { useEffect, useState } from "react";
import css from "./profile.module.css";
import ProfAndSetting from "./components/profAndSetting";
import withMySQLData from "../../../HOK/withMySQLData";
import axios from "axios";
import Brand from "./components/brand";
import Shipping from "./components/shipping";
import ReturnsComponent from "./components/returnsComponent";
import ContactVendor from "./components/contactVendor";
import CertificatProf from "./components/certificatProf";
import PaymentInfo from "./components/paymentInfo";
import { Circles } from "react-loader-spinner";
import Swal from "sweetalert2";
const ProfileSettings = ({ activeUser, setUsers, users }) => {
  const [theId, setTheId] = useState("");
  const [publicProf, setPublicProf] = useState(true);
  const [brand, setBrand] = useState(false);
  const [payment, setPayment] = useState(false);
  const [returns, setReturns] = useState(false);
  const [shipping, setShipping] = useState(false);
  const [certificat, setCertificat] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [video, setVideo] = useState(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [logoT, setLogoT] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState("");
  const [brandDesc, setBrandDesc] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState(null);
  const [baner, setBaner] = useState(null);
  const [brandId, setBrandIs] = useState(null);
  const [payaut, setPayaut] = useState(null);
  const [stateList, setStateList] = useState(null);
  const [street, setStreet] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");
  const [cityList, setCityList] = useState([]);
  const [misto, setMisto] = useState("");
  const [zip, setZip] = useState("");
  const [cityFotrBase, setCityFotrBase] = useState("");
  const [shipC, setShipC] = useState(false);
  const [localPick, setLocalPick] = useState(false);
  const [freeShip, setFreeShip] = useState(false);
  const [priceForFreeShip, setPriceForFreeShip] = useState(75);
  const [returnsOnProf, setReturnsOnProf] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickUpAddress, setPickUpAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    if (users) {
      setName(users.first_name);
      setPriceForFreeShip(users.free_shipping_price);
      setPickUpAddress(users.pick_up_address);
      setEmail(users.email);
      setPhone(users.phone);
      setShipC(() => {
        if (users && users.shipping === "false") {
          return false;
        } else if (users && users.shipping === "true") {
          return true;
        }
      });
      setLocalPick(() => {
        if (users && users.pickup === "false") {
          return false;
        } else if (users && users.pickup === "true") {
          return true;
        }
      });
      setFreeShip(() => {
        if (users && users.free_shipping === "false") {
          return false;
        } else if (users && users.free_shipping === "true") {
          return true;
        }
      });
      setReturnsOnProf(() => {
        if (users.returns === "false") {
          return false;
        } else if (users.returns === "true") {
          return true;
        }
      });
    }
  }, []);

  const sendDataToServer = async (event) => {
    event.preventDefault(); // Щоб уникнути перезавантаження сторінки
    setLoading(true);
    const form = event.target;
    const data = new FormData();
    const formDataObj = Object.fromEntries(data.entries());
    formDataObj.first_name = name;
    formDataObj.brand_description = brandDesc;
    formDataObj.my_brand_id = brandId;
    formDataObj.payout_details_id = payaut;
    formDataObj.country = theId;
    formDataObj.state = stateId;
    formDataObj.city = cityId;
    formDataObj.street = street;
    formDataObj.zip_code = zip;
    formDataObj.email = email;
    formDataObj.phone = phone;

    formDataObj.video = videoUrl;
    formDataObj.shipping = `${shipC}`;
    formDataObj.pickup = `${localPick}`;
    formDataObj.free_shipping = `${freeShip}`;
    formDataObj.free_shipping_price = Number(priceForFreeShip);
    formDataObj.returns = `${returnsOnProf}`;
    formDataObj.pick_up_address = pickUpAddress;

    try {
      let url;
      if (logoT) {
        // Відправка файлу на сервер
        const fileFormData = new FormData();
        fileFormData.append("file", logoT);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
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
      if (photo) {
        // Відправка файлу на сервер
        const fileFormData = new FormData();
        fileFormData.append("photo", photo);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
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
      if (baner) {
        // Відправка файлу на сервер
        const fileFormDataT = new FormData();
        fileFormDataT.append("fileT", baner);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
          fileFormDataT,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // Отримання URL завантаженого файлу
        url = fileResponse.data.url;
      }
      if (video) {
        // Відправка файлу на сервер
        const fileFormDataT = new FormData();
        fileFormDataT.append("video", video);

        const fileResponse = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/file/${users.id}`, // URL для завантаження файлу
          fileFormDataT,
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
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${users.id}`, // Потрібно замінити userId на відповідний id користувача
        formDataObj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response && response.statusText === "OK") {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Successfully saved",
          text: "Data successfully updated",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // Додайте тут логіку для обробки успішної відправки даних
    } catch (error) {
      console.error("Error sending data:", error);

      // Додайте тут логіку для обробки помилки відправки даних
    }
  };
  const handleItemClick = (setter) => {
    setPublicProf(false);
    setBrand(false);
    setPayment(false);
    setReturns(false);
    setShipping(false);
    setCertificat(false);
    setContacts(false);
    setter(true);
  };

  return (
    <div className={css.profileSettingWrap}>
      <div className={css.headerProfWrap}>
        <p className={css.pSetProfile}>Profile & Settings</p>
        {!payment && (
          <div className={css.cancelSaveWrap}>
            <button className={css.cancel}>Cancel</button>
            <button className={css.save} onClick={sendDataToServer}>
              Save
            </button>
          </div>
        )}
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
            brand ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setBrand)}
        >
          Brand
        </li>
        <li
          className={
            payment ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setPayment)}
        >
          Payment information
        </li>
        <li
          className={
            returns ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setReturns)}
        >
          Returns and refunds
        </li>
        <li
          className={
            shipping ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setShipping)}
        >
          Shipping
        </li>
        <li
          className={
            certificat
              ? `${css.profileLi} ${css.profileLiActive}`
              : css.profileLi
          }
          onClick={() => handleItemClick(setCertificat)}
        >
          Certifications and ingredient
        </li>
        <li
          className={
            contacts ? `${css.profileLi} ${css.profileLiActive}` : css.profileLi
          }
          onClick={() => handleItemClick(setContacts)}
        >
          Contact info
        </li>
      </ul>
      {publicProf && (
        <ProfAndSetting
          users={users}
          setUsers={setUsers}
          setLogoT={setLogoT}
          logoT={logoT}
          activeUser={activeUser}
          setName={setName}
          name={name}
          setPhoto={setPhoto}
          photo={photo}
        />
      )}
      {brand && (
        <Brand
          users={users}
          setUsers={setUsers}
          setBaner={setBaner}
          setBrandDesc={setBrandDesc}
          brandDesc={brandDesc}
          setVideo={setVideo}
          video={video}
          setVideoUrl={setVideoUrl}
          videoUrl={videoUrl}
        />
      )}
      {shipping && (
        <Shipping
          setShipC={setShipC}
          setLocalPick={setLocalPick}
          shipC={shipC}
          localPick={localPick}
          setFreeShip={setFreeShip}
          freeShip={freeShip}
          priceForFreeShip={priceForFreeShip}
          setPriceForFreeShip={setPriceForFreeShip}
          users={users}
          pickUpAddress={pickUpAddress}
          setPickUpAddress={setPickUpAddress}
          street={street}
          setStreet={setStreet}
          zip={zip}
          setZip={setZip}
          theId={theId}
          setTheId={setTheId}
          cityId={cityId}
          setCityId={setCityId}
          stateId={stateId}
          setStateId={setStateId}
        />
      )}
      {returns && (
        <ReturnsComponent
          setReturnsOnProf={setReturnsOnProf}
          returnsOnProf={returnsOnProf}
        />
      )}
      {contacts && (
        <ContactVendor
          setEmail={setEmail}
          email={email}
          setPhone={setPhone}
          phone={phone}
        />
      )}
      {certificat && <CertificatProf users={users} />}
      {payment && (
        <PaymentInfo
          setCardName={setCardName}
          cardName={cardName}
          setCardNumber={setCardNumber}
          cardNumber={cardNumber}
          sendDataToServer={sendDataToServer}
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
          users={users}
        />
      )}
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
export default ProfileSettings;

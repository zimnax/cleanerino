import css from "./vendorProductSt.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import backTOLi from "../../svg/backToVenList.svg";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";
import ProfAndSetting from "./changeVendorData/profAndSetting";
import BrandName from "./changeVendorData/brandName";
import PaymentInfo from "./changeVendorData/paymentInfo";
import Returns from "./changeVendorData/returns";
import Shiping from "./changeVendorData/shiping";
import Certification from "./changeVendorData/certification";
const VendorProfileOne = () => {
  const { id } = useParams();
  const [users, setUsers] = useState(null);
  const [surName, setSurName] = useState("");
  const navigate = useNavigate();
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
  const [brandName, setBrandName] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  useEffect(() => {
    if (users) {
      setName(users.first_name);
      setSurName(users.last_name);
      setBrandName(users.brand_name);
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
  }, [users]);
  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile/${id}`
        );
        console.log("response.data", response.data);
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
      }
    };

    if (id) {
      fetchVendorData();
    }
  }, [id]);

  const sendDataToServer = async (event) => {
    event.preventDefault(); // Щоб уникнути перезавантаження сторінки
    setLoading(true);
    const form = event.target;
    const data = new FormData();
    const formDataObj = Object.fromEntries(data.entries());
    formDataObj.first_name = name;
    formDataObj.last_name = surName;
    formDataObj.brand_name = brandName;
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
  return (
    <div className={css.vendorAllWrapChInf}>
      <div className={css.wrapVendorNameB}>
        <div className={css.vendorIconInWrap}>
          <ReactSVG
            src={backTOLi}
            className={css.backToVendorList}
            onClick={() => navigate("/admin/vendors")}
          />
          <div className={css.wrapNameIcon}>
            {users && users.photo && (
              <img className={css.iconVendor} src={users.photo} />
            )}

            {users && !users.photo && (
              <div className={css.withoutPhoto}>{users.last_name[0]}</div>
            )}
          </div>
          {users && (
            <p className={css.nameVendor}>
              {users.first_name}&nbsp; {users.last_name}
            </p>
          )}
        </div>
        <div className={css.buttonChange}>Save</div>
      </div>

      <div className={css.wrapOneProfile}>
        <div className={css.wrapFirstBlockVenOne}>
          <ProfAndSetting
            users={users}
            setUsers={setUsers}
            setLogoT={setLogoT}
            logoT={logoT}
            setName={setName}
            name={name}
            setPhoto={setPhoto}
            photo={photo}
            surName={surName}
            setSurName={setSurName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
          <BrandName
            brandName={brandName}
            setBrandName={setBrandName}
            users={users}
          />
        </div>
        <div className={css.wrapFirstBlockVenOne}>
          <PaymentInfo users={users} />
          <Returns
            setReturnsOnProf={setReturnsOnProf}
            returnsOnProf={returnsOnProf}
          />
          <Shiping
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
          <Certification users={users} />
        </div>
      </div>
    </div>
  );
};
export default VendorProfileOne;

import { useEffect, useRef, useState } from "react";
import css from "../vendorProductSt.module.css";
import logoRec from "../../../img/Rectangle4.png";
import { ReactSVG } from "react-svg";
import upload from "../../../svg/upload.svg";
import withMySQLData from "../../HOK/withMySQLData";
const BrandName = ({
  sendDataToServer,
  setPhoto,
  photo,
  users,
  setUsers,
  logoT,
  setLogoT,
  surName,
  setSurName,
  setName,
  name,
  email,
  setEmail,
  phone,
  setPhone,
  brandName,
  setBrandName,
}) => {
  const fileInputRefLogo = useRef(null);
  const fileInputRefPhoto = useRef(null);

  const handleLogoClickLogo = () => {
    fileInputRefLogo.current.click();
  };
  const handleLogoClickPhoto = () => {
    fileInputRefPhoto.current.click();
  };

  const handleFileChangeLogo = (event) => {
    setLogoT(event.target.files[0]);

    // Додайте вашу логіку для завантаження файлу тут
  };
  const handleFileChangePhoto = (event) => {
    setPhoto(event.target.files[0]);

    // Додайте вашу логіку для завантаження файлу тут
  };
  return (
    <div className={css.wrapPabAnfSet}>
      <p className={css.venDescTop}>Vendor store</p>

      <p className={css.mainTextP}>Brand Name</p>

      <input
        className={css.nameInput}
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />

      <p className={css.mainTextP}>Logo</p>

      {users && users.logo && (
        <img src={users.logo} className={css.photoLogo} alt="logo" />
      )}
      {users && !users.logo && (
        <img src={logoRec} className={css.photoLogo} alt="logo" />
      )}
      <p className={css.mainTextP}>Baner</p>

      {users && users.logo && (
        <img src={users.logo} className={css.photoBanner} alt="logo" />
      )}
      <p className={css.mainTextP}>Brand description</p>

      <textarea
        className={css.nameInputArea}
        value={brandName}
        onChange={(e) => setBrandName(e.target.value)}
      />
    </div>
  );
};
export default BrandName;

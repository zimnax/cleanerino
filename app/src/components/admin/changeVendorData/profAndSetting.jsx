import { useEffect, useRef, useState } from "react";
import css from "../vendorProductSt.module.css";
import logoRec from "../../../img/Rectangle4.png";
import { ReactSVG } from "react-svg";
import upload from "../../../svg/upload.svg";
import withMySQLData from "../../HOK/withMySQLData";
const ProfAndSetting = ({
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
      <p className={css.venDescTop}>Vendor description</p>

      <p className={css.mainTextP}>Name</p>

      <input
        className={css.nameInput}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <p className={css.mainTextP}>Last name</p>

      <input
        className={css.nameInput}
        value={surName}
        onChange={(e) => setSurName(e.target.value)}
      />
      <p className={css.mainTextP}>Phone</p>

      <input
        className={css.nameInput}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <p className={css.mainTextP}>Email</p>

      <input
        className={css.nameInput}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <p className={css.mainTextP}>Photo</p>

      {users && users.photo && (
        <img src={users.photo} className={css.photoLogo} alt="logo" />
      )}
      {users && !users.photo && (
        <img src={logoRec} className={css.photoLogo} alt="logo" />
      )}
    </div>
  );
};
export default ProfAndSetting;

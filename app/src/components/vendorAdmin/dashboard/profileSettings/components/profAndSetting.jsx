import { useEffect, useRef, useState } from "react";
import css from "../profile.module.css";
import logoRec from "../../../../../img/Rectangle4.png";
import { ReactSVG } from "react-svg";
import upload from "../../../../../svg/upload.svg";
import withMySQLData from "../../../../HOK/withMySQLData";
const ProfAndSetting = ({
  sendDataToServer,
  setPhoto,
  photo,
  users,
  setUsers,
  logoT,
  setLogoT,

  setName,
  name,
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
      <div className={css.feirstNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextP}>Name</p>
          <p className={css.secondText}>Name displayed on your store page</p>
        </div>
        <input
          className={css.nameInput}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={css.secondNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Logo</p>
          <p className={css.secondText}>
            Upload your brand logo. You can change it at any time.
          </p>
        </div>

        <div className={css.wrapLogoDrop} onClick={handleLogoClickLogo}>
          {users && users.logo && (
            <img src={users.logo} className={css.photoLogo} alt="logo" />
          )}
          {users && !users.logo && (
            <img src={logoRec} className={css.photoLogo} alt="logo" />
          )}
          <div className={css.dropDownWrap}>
            <ReactSVG src={upload} />
            <p className={css.descPDrop}>
              <span className={css.descPDropSpan}>Click to upload logo</span>
              *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
              <span className={css.descSpanSize}>280х432px.</span>
            </p>
          </div>
        </div>
        <input
          type="file"
          id="logoUploadLogo"
          name="logo"
          ref={fileInputRefLogo}
          accept=".svg,.png,.jpeg,.jpg,.gif"
          onChange={handleFileChangeLogo}
          style={{ display: "none" }}
        />
      </div>
      <div className={css.secondNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Photo</p>
          <p className={css.secondText}>
            Photo displayed on your store page next to your name
          </p>
        </div>

        <div className={css.wrapLogoDrop} onClick={handleLogoClickPhoto}>
          {users && users.photo && (
            <img src={users.photo} className={css.photoLogo} alt="logo" />
          )}
          {users && !users.photo && (
            <img src={logoRec} className={css.photoLogo} alt="logo" />
          )}
          <div className={css.dropDownWrap}>
            <ReactSVG src={upload} />
            <p className={css.descPDrop}>
              <span className={css.descPDropSpan}>Click to upload photo</span>
              *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
              <span className={css.descSpanSize}>280х432px.</span>
            </p>
          </div>
        </div>
        <input
          type="file"
          id="logoUploadPhoto"
          name="photo"
          ref={fileInputRefPhoto}
          accept=".svg,.png,.jpeg,.jpg,.gif"
          onChange={handleFileChangePhoto}
          style={{ display: "none" }}
        />
      </div>
    </div>
  );
};
export default ProfAndSetting;

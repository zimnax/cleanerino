import { useEffect, useRef, useState } from "react";
import css from "./cabinet.module.css";
import logoRec from "../../img/Rectangle4.png";
import { ReactSVG } from "react-svg";
import upload from "../../svg/upload.svg";
const ProfAndSet = ({
  sendDataToServer,
  setPhoto,

  users,

  logoT,
  setLogoT,

  setName,
  setEmail,
  email,
  setPhone,
  phone,
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
      <div className={css.secondNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextP}>Your photo</p>
          <p className={css.secondText}>
            Commodo morbi egestas gravida risus ut odio nunc velit consequat.
            Purus.
          </p>
        </div>

        <div className={css.wrapLogoDrop} onClick={handleLogoClickLogo}>
          {logoT && (
            <img
              src={URL.createObjectURL(logoT)}
              className={css.photoLogo}
              alt="logo"
            />
          )}
          {!logoT && users && users.photo && (
            <img src={users.photo} className={css.photoLogo} alt="logo" />
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
      <div className={css.feirstNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextP}>Personal information</p>
          <p className={css.secondText}>Tellus vitae nec quis in rhoncus</p>
        </div>
        <div className={css.inputWithTextWrap}>
          <div className={css.smalInpWrapSet}>
            <p className={css.fullNameP}>Full Name</p>
            <input
              className={css.nameInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={css.smalInpWrapSet}>
            <p className={css.fullNameP}>Email</p>
            <input
              className={css.nameInput}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={css.smalInpWrapSet}>
            <p className={css.fullNameP}>Phone</p>
            <input
              className={css.nameInput}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfAndSet;

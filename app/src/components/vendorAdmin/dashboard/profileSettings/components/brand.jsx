import css from "../profile.module.css";
import { ReactSVG } from "react-svg";
import upload from "../../../../../svg/upload.svg";
import { useEffect, useRef, useState } from "react";
import hold from "../../../../../svg/Hold.svg";
import logoRec from "../../../../../img/Rectangle4.png";
import axios from "axios";
import play from "../../../../../svg/Play.svg";
import { AiOutlineClose } from "react-icons/ai";

const Brand = ({
  users,
  setUsers,
  setBaner,
  setBrandDesc,
  brandDesc,
  setVideo,
  video,
  setVideoUrl,
  videoUrl,
}) => {
  const [dataForFile, setDataForFile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleVideoClick = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  useEffect(() => {
    if (users && users.video) {
      const url = users.video;
      const parsedUrl = new URL(url);
      const filePath = decodeURIComponent(parsedUrl.pathname);
      const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);

      const publicUrlWithoutToken = `https://firebasestorage.googleapis.com/v0/b/cleanerio-b080f.appspot.com/o/foto%2F${fileName}`;
      axios
        .get(publicUrlWithoutToken)
        .then((response) => {
          // Обробка відповіді

          setDataForFile(response.data);
        })
        .catch((error) => {
          // Обробка помилки
          console.error("Error fetching data:", error);
        });
    }
  }, [users]);
  const fileInputRefBrand = useRef(null);
  const handleLogoClickBrand = () => {
    fileInputRefBrand.current.click();
  };
  const handleFileChangeBrand = (event) => {
    setBaner(event.target.files[0]);
  };
  const fileInputRefVideo = useRef(null);
  const handleLogoClickVideo = () => {
    fileInputRefVideo.current.click();
  };
  const handleFileChangeVideo = (event) => {
    setVideo(event.target.files[0]);
  };
  const changeVideoUrl = (e) => {
    const url = e.target.value;
    setVideo(null);
    setVideoUrl(url);
  };
  useEffect(() => {
    if (users) {
      setBrandDesc(users.brand_description);
    }
  }, [users]);

  return (
    <div className={css.wrapBrandSet}>
      <div className={css.secondNameWr}>
        <div className={css.wrapText}>
          <p className={css.mainTextPSecond}>Baner</p>
          <p className={css.secondText}>
            A rectangular image displayed at the top of your store page.
          </p>
        </div>

        <div className={css.wrapLogoDropTwo} onClick={handleLogoClickBrand}>
          {users && users.logo && (
            <img src={users.banner} className={css.photoLogoTwo} alt="logo" />
          )}
          {users && !users.logo && (
            <img src={logoRec} className={css.photoLogoTwo} alt="logo" />
          )}
          <div className={css.dropDownWrapVideo}>
            <ReactSVG src={upload} />
            <p className={css.descPDrop}>
              <span className={css.descPDropSpan}>Click to upload baner</span>
              *.svg, *.png, *.jpeg, *.jpg, *.gif. Size{" "}
              <span className={css.descSpanSize}>280х432px.</span>
            </p>
          </div>
        </div>
        <input
          type="file"
          id="logoUploadLogo"
          name="logo"
          ref={fileInputRefBrand}
          accept=".svg,.png,.jpeg,.jpg,.gif"
          onChange={handleFileChangeBrand}
          style={{ display: "none" }}
        />
      </div>
      <div className={css.feirsBrandWrap}>
        <div className={css.wrapText}>
          <p className={css.mainTextP}>Brand description</p>
          <p className={css.secondText}>
            Showcase your values, ingredients, and brand story,
          </p>
        </div>
        <textarea
          className={css.brandTextarea}
          value={brandDesc}
          onChange={(e) => setBrandDesc(e.target.value)}
        />
      </div>
      <div className={css.wrapBrandVideo}>
        <div className={css.wrapText}>
          <p className={css.mainTextP}>Brand video</p>
          <p className={css.secondText}>
            Upload a video that tells your story and gives a glimpse into your
            day-to-day.
          </p>
        </div>
        <div className={css.wrapVideo}>
          {users && users.video && dataForFile && (
            <div className={css.wrpaVideoHave}>
              <div className={css.nameVideoWr}>
                <div className={css.videoWrsp} onClick={handleVideoClick}>
                  <ReactSVG src={play} />
                </div>

                <div className={css.memoryName}>
                  <p className={css.videoName}>{dataForFile.name}</p>
                  <p className={css.memoryN}>
                    {(parseInt(dataForFile.size) / (1024 * 1024)).toFixed(2)}mb
                  </p>
                </div>
              </div>
              <ReactSVG src={hold} />
            </div>
          )}
          {isPopupOpen && (
            <div className={css.popupOverlay}>
              <AiOutlineClose className={css.hold} onClick={closePopup} />

              <div className={css.popupContent}>
                {/* Here goes your popup content */}
                <video
                  className={css.popupVideo}
                  src={users.video}
                  controls
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          )}
          <div className={css.dropDownWrapVideo} onClick={handleLogoClickVideo}>
            <ReactSVG src={upload} />
            <p className={css.descPDrop}>
              <span className={css.descPDropSpan}>Click to upload video</span>
              *.svg, *.png, *.jpeg, *.jpg, *.gif. Max
              <span className={css.descSpanSize}>1GB</span>
            </p>
            <input
              type="file"
              id="videoUpload"
              name="video"
              ref={fileInputRefVideo}
              accept="video/*"
              onChange={handleFileChangeVideo}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Brand;

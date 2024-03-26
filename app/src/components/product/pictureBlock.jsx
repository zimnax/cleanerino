import css from "./product.module.css";
import { ReactSVG } from "react-svg";
import arrowUp from "../../svg/arrowUpButton.svg";
import arrowDown from "../../svg/arrowDownButton.svg";
import { useRef, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

const PictureBlock = ({ productData }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef(null);
  const [mainPhoto, setMainPhoto] = useState({ ulr: "", type: "" });
  useState(() => {
    setMainPhoto({
      ulr: productData.files[0].file,
      type: productData.files[0].type,
    });
  }, [productData]);
  const handleScroll = (direction) => {
    const container = containerRef.current;
    const containerHeight = container.clientHeight;
    const maxScroll = container.scrollHeight - containerHeight;
    let newPosition;

    if (direction === "up") {
      newPosition = Math.max(0, scrollPosition - 100); // Прокрутити вгору на 100px
    } else {
      newPosition = Math.min(maxScroll, scrollPosition + 100); // Прокрутити вниз на 100px
    }

    container.scrollTo({ top: newPosition, behavior: "smooth" });
    setScrollPosition(newPosition);
  };
  const changePhotoUrl = (clickedPhoto) => {
    setMainPhoto({
      ulr: clickedPhoto.file,
      type: clickedPhoto.type,
    });
  };

  return (
    <div className={css.pictureBlockWrap}>
      <div className={css.wrapAllPhoto}>
        <button className={css.buttonUp} onClick={() => handleScroll("up")}>
          <ReactSVG src={arrowUp} className={css.arrowInButton} />
        </button>
        <div className={css.allPicWrap} ref={containerRef}>
          {productData.files.map((el, index) => {
            if (el.type === "photo") {
              return (
                <div
                  className={css.pictureWrap}
                  key={index}
                  onClick={() => changePhotoUrl(el)}
                >
                  <img src={el.file} className={css.imageSmall} />
                </div>
              );
            }
            if (el.type === "video") {
              return (
                <div
                  className={css.pictureWrap}
                  key={index}
                  onClick={() => changePhotoUrl(el)}
                >
                  <div className={css.faCirc}>
                    <FaCirclePlay className={css.faCircIcon} />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <button className={css.buttonDown} onClick={() => handleScroll("down")}>
          <ReactSVG src={arrowDown} className={css.arrowInButton} />
        </button>
      </div>
      <div className={css.wrapOnePhoto}>
        {mainPhoto.type === "photo" && (
          <img src={mainPhoto.ulr} className={css.imgBigA} />
        )}
        {mainPhoto.type === "video" && (
          <video className={css.imgBigA} controls>
            <source src={mainPhoto.file} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};
export default PictureBlock;

import css from "./product.module.css";
import { ReactSVG } from "react-svg";
import starFull from "../../../svg/StarNewHaveOk.svg";
import starNotFull from "../../../svg/StarNewHave.svg";
import upload from "../../../svg/upload.svg";
import logoRec from "../../../img/Rectangle4.png";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import arrowClose from "../../../svg/closeWindow.svg";
import axios from "axios";
import srarSmallE from "../../../svg/StarOpenSmall.svg";
import starNotOpen from "../../../svg/StarNotOpen.svg";
const Reviews = ({ productData }) => {
  const [logoT, setLogoT] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [serRating, setSerRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [closePop, setClosePop] = useState(false);
  const fileInputRefLogo = useRef(null);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const handleLogoClickLogo = () => {
    fileInputRefLogo.current.click();
  };
  const handleFileChangeLogo = (event) => {
    setLogoT(event.target.files[0]);
  };

  const handleClickRating = (value) => {
    if (value === rating) {
      setRating(0);
    } else {
      setRating(value);
    }
  };
  const handleSeeMoreReviews = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 3);
  };
  const handleMouseOverRating = (value) => {
    setHoveredRating(value);
  };
  useEffect(() => {
    if (productData.reviews) {
      const totalRatings = productData.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = (totalRatings / productData.reviews.length).toFixed(
        1
      );
      setSerRating(averageRating);
    }
  }, [productData]);
  const handleMouseLeaveRating = () => {
    setHoveredRating(0);
  };
  const sendReviewData = async () => {
    try {
      // Створюємо об'єкт FormData для відправки файлів
      const formData = new FormData();
      formData.append("prod_id", productData.id);
      formData.append("name", name);
      formData.append("rating", rating);
      formData.append("comment", comment);

      // Додаємо файл до FormData, якщо він був вибраний
      if (logoT) {
        formData.append("file", logoT);
      }

      // Відправляємо POST запит на сервер
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/reviews`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Важливо встановити правильний Content-Type для відправки файлів
          },
        }
      );

      // Обробляємо відповідь від сервера
      if (response.status === 200) {
        // Показуємо повідомлення про успішне додавання відгуку
        Swal.fire({
          icon: "success",
          title: "Feedback added",
          confirmButtonColor: "#609966",
        }).then(() => {
          // При натисканні на кнопку "Ok" закриваємо вікно для створення відгуку
          setClosePop(false);
        });
      }
    } catch (error) {
      // Обробляємо помилку
      console.error("Error sending review data:", error);
      throw new Error("Error sending review data");
    }
  };
  return (
    <div className={css.rewiewsWrapAll}>
      <div className={css.rewiewsWrapAllSmall}>
        <div className={css.firstBlockInWrite}>
          <p className={css.titleNameRev}>RATINGS & REVIEWS</p>
          <div className={css.wrapRatingAllAndB}>
            <p className={css.pCountRatingW}>
              {serRating}
              <span className={css.smallSpanInReti}>/5</span>
            </p>
            <div className={css.wrapStarInRew}>
              <div className={css.starSp}>
                {[1, 2, 3, 4, 5].map((index) => (
                  <ReactSVG
                    key={index}
                    src={index <= serRating ? srarSmallE : starNotOpen}
                  />
                ))}
              </div>
              <p className={css.countNewRe}>
                (
                {productData &&
                  productData.reviews &&
                  productData.reviews.length}{" "}
                Reviews)
              </p>
            </div>
          </div>
          <button
            className={css.createNewRew}
            onClick={() => setClosePop(true)}
          >
            Write a review
          </button>
        </div>
        <div className={css.wrapScaleRating}>
          {productData && productData.reviews && (
            <>
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = productData.reviews.filter(
                  (review) => review.rating === stars
                ).length;
                const percentage = (
                  (count / productData.reviews.length) *
                  100
                ).toFixed(0);
                return (
                  <div className={css.wrapScaleOne} key={stars}>
                    <ReactSVG
                      src={starNotOpen}
                      className={css.starNotInScale}
                    />
                    <p className={css.counterStar}>{stars} stars</p>
                    <div className={css.scale}>
                      <div
                        className={css.procentScale}
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: "#609966",
                        }}
                      ></div>
                    </div>
                    <p className={css.procentScale}>{percentage}%</p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
      <div className={css.wrapAllReviewFor}>
        {productData &&
          productData.reviews &&
          productData.reviews.map((el, index) => {
            const inputDate = el.created_at;

            // Розбиваємо дату на компоненти
            const dateComponents = inputDate.split(/[-T:]/);

            // Отримуємо значення року, місяця та дня
            const year = dateComponents[0];
            const month = dateComponents[1];
            const day = dateComponents[2];

            // Масив назв місяців
            const monthNames = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];

            // Отримуємо назву місяця
            const monthName = monthNames[parseInt(month) - 1];

            // Створюємо новий рядок з форматом "Mar, 11 2024"
            const formattedDate = `${monthName}, ${day} ${year}`;
            if (index < visibleReviews) {
              return (
                <>
                  <div className={css.wrapOneS} key={index}>
                    <div className={css.wrapNameWithData}>
                      <p className={css.dataP}>{formattedDate}</p>
                      <p className={css.nameReview}>{el.name}</p>
                    </div>
                    <div className={css.wrapTheReviews}>
                      <div className={css.starSp}>
                        {[1, 2, 3, 4, 5].map((index) => (
                          <ReactSVG
                            key={index}
                            src={index <= el.rating ? srarSmallE : starNotOpen}
                          />
                        ))}
                      </div>
                      <p className={css.descReviewFull}>{el.comment}</p>
                      {el.photo && (
                        <img
                          className={css.reviewPhoto}
                          src={el.photo}
                          alt="Photo"
                        />
                      )}
                    </div>
                  </div>
                  <div className={css.reviewLIne}></div>
                </>
              );
            }
          })}
      </div>
      <div className={css.buttonSeeMore} onClick={handleSeeMoreReviews}>
        See More
      </div>
      {closePop && (
        <div className={css.wrapAddRewiew}>
          <div className={css.wrPopAddReviews}>
            <ReactSVG
              src={arrowClose}
              className={css.closePop}
              onClick={() => setClosePop(false)}
            />
            <p className={css.pInRewAddNew}>New review</p>
            <p className={css.namePInPop}>Name</p>
            <input
              className={css.inputNewPop}
              placeholder="Cameron Williamson"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className={css.namePInPop}>Rating</p>
            {/* <div className={css.wrapStarRatingPop}>
            <ReactSVG src={starFull} className={css.starF} />
            <ReactSVG src={starFull} className={css.starF} />
            <ReactSVG src={starFull} className={css.starF} />
            <ReactSVG src={starNotFull} className={css.starNotF} />
          </div> */}
            <div
              className={css.wrapStarRatingPop}
              onMouseLeave={handleMouseLeaveRating}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <ReactSVG
                  key={value}
                  src={
                    value <= (hoveredRating || rating) ? starFull : starNotFull
                  }
                  className={css.starF}
                  onClick={() => handleClickRating(value)}
                  onMouseOver={() => handleMouseOverRating(value)}
                />
              ))}
            </div>
            <textarea
              className={css.textAreaComment}
              placeholder="Comments"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <p className={css.namePInPop}>Photo</p>
            <div className={css.wrapLogoDrop} onClick={handleLogoClickLogo}>
              {/* {logoT ? (
              <img
                src={URL.createObjectURL(logoT)}
                className={css.photoLogo}
                alt="logo"
              />
            ) : (
              <img src={logoRec} className={css.photoLogo} alt="logo" />
            )} */}
              <div className={css.dropDownWrap}>
                <ReactSVG src={upload} />
                <p className={css.descPDrop}>
                  <span className={css.descPDropSpan}>
                    Click to upload logo
                  </span>
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
            <div className={css.wrapTwoButton}>
              <p className={css.pCancelBut}>Cancel</p>
              <button className={css.buttonSave} onClick={sendReviewData}>
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Reviews;

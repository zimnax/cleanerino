import css from "./vendor.module.css";
import baner from "../../svg/RectangleBaner.png";
import logo from "../../img/dfsdfsdfv.jpeg";
import appL from "../../svg/appEw.svg";
import { ReactSVG } from "react-svg";
import locat from "../../svg/Location.svg";
import { useEffect, useState } from "react";
import star from "../../svg/Star.svg";
import messs from "../../svg/Commentfsdf(1).svg";
import arr from "../../svg/arrowToU.svg";
import skip from "../../svg/ChevronSkip.svg";
import search from "../../svg/SearchProduct.svg";
import CategoryList from "../vendorAdmin/dashboard/mainDashboard/standartComponent/categoryList";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
const VendorDescription = ({ users }) => {
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [categoryListAll, setCategoryListAll] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  useEffect(() => {
    if (users) {
      GetCountries(users.country).then((result) => {
        const foundCity = result.find((c) => c.id === users.country);
        setCountry(foundCity);
      });
      GetCity(users.country, users.state).then((result) => {
        const foundCity = result.find((c) => c.id === users.city);

        setCity(foundCity);
      });
    }
  }, [users]);
  const clickToMore = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      {users && (
        <div className={css.wrapAllDesc}>
          <div className={css.wrapWendorBaner}>
            {users && users.banner && (
              <img src={users.banner} className={css.imgBaner} />
            )}
            {users && users.banner === "" && (
              <img src={baner} className={css.imgBaner} />
            )}
          </div>
          <div className={css.wrapVendorInformation}>
            <div className={css.wrapFirstB}>
              <div className={css.picWrap}>
                {users && users.banner && (
                  <img src={users.logo} className={css.imgLogo} />
                )}
                {users && users.banner === "" && (
                  <img src={logo} className={css.imgLogo} />
                )}
                <div className={css.wrapApp}>
                  <ReactSVG src={appL} />
                </div>
              </div>
              <div className={css.descNameWr}>
                <div className={css.nameWithCertWrap}>
                  <p className={css.pNameDesc}>{users.brand_name}</p>
                </div>
                <div className={css.locationWrap}>
                  <ReactSVG src={locat} />
                  {city && country && (
                    <p className={css.styleNameCountry}>
                      {city.name}, {country.name}
                    </p>
                  )}
                </div>
                <div className={css.locationWrap}>
                  <ReactSVG src={star} />
                  <p className={css.starRating}>4.5</p>
                </div>
              </div>
            </div>
            <div className={css.wrapVendorInfoNew}>
              {users && users.photo !== "" && (
                <img className={css.imagePhotoWrap} src={users.photo} />
              )}
              <p className={css.nameP}>
                {users.first_name} {users.last_name}
              </p>
              <p className={css.wrapConIcon}>
                <ReactSVG src={messs} className={css.mesIcon} />
                Contact
              </p>
            </div>
          </div>
          <div className={css.wrapDescBig}>
            <p className={css.brandDesc}>Brand description</p>
            <div className={css.wrNewP}>
              <div
                className={isExpanded ? css.wrapDescWithVB : css.wrapDescWithV}
              >
                <p className={css.pDescLong}>{users.brand_description} </p>
                <div className={css.line}></div>
                {users && users.video !== "" && (
                  <video controls className={css.videoSt}>
                    <source src={users.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
              {!isExpanded && (
                <p className={css.moreDesc} onClick={clickToMore}>
                  <ReactSVG src={arr} className={css.arrowSt} />
                  More
                </p>
              )}
              {isExpanded && (
                <p className={css.moreDescSkip} onClick={clickToMore}>
                  <ReactSVG src={skip} className={css.arrowSt} />
                  Skip
                </p>
              )}
            </div>
          </div>
          {/* <div className={css.wrapSearch}>
            <CategoryList
              setSelectedCategoryId={setSelectedCategoryId}
              selectedCategoryId={selectedCategoryId}
              setCategoryListAll={setCategoryListAll}
            />
            <div className={css.wrapInput}>
              <ReactSVG src={search} className={css.searchICon} />
              <input
                className={css.inputSearchProd}
                value={nameProduct}
                onChange={(e) => setNameProduct(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};
export default VendorDescription;

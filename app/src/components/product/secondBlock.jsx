import { useEffect, useState } from "react";
import css from "./product.module.css";
import Ingridient from "./ingridient";
import { ReactSVG } from "react-svg";
import pack from "../../svg/pacgW.svg";
import add from "../../svg/benefAdd.svg";
import without from "../../svg/Holdkjf.svg";
import certif from "../../svg/Verifyhg.svg";
import che from "../../svg/Checkprod.svg";
import delIcon from "../../svg/DeleteInP.svg";
import AlsoLike from "./alsoLike";
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages, //async functions
} from "react-country-state-city";
import withMySQLData from "../HOK/withMySQLData";
const SecondBlock = ({ productData, brand, data, ingridients }) => {
  const [selectedDescription, setSelectedDescription] = useState("Description");
  const [selectedSustainability, setSelectedSustainability] = useState("");
  const [selectedCare, setSelectedCare] = useState("");
  const [packig, setPackig] = useState("");
  const [country, setCountry] = useState(null);
  const [certification, setCertification] = useState(null);
  const [benefits, setBenefits] = useState([]);

  useEffect(() => {
    if (productData && productData.certificates && data) {
      // Створюємо масив сертифікатів, що потрібно знайти
      const certificatesToFind = productData.certificates.map(
        (cert) => cert.certif_sub_cat
      );

      // Фільтруємо сертифікати з data за certif_sub_cat
      const foundCertificates = data.filter((cert) =>
        certificatesToFind.includes(cert.id)
      );

      // Встановлюємо знайдені сертифікати в стан
      setCertification(foundCertificates);
    }
  }, [productData, data]);
  useEffect(() => {
    if (productData.glass !== null) {
      setPackig(`${productData.glass}.  Rinse and place in your recycling bin`);
    } else if (productData.metal !== null) {
      setPackig(`${productData.metal}. Rinse and place in your recycling bin.`);
    } else if (productData.paper_cardboard !== null) {
      setPackig(
        `${productData.paper_cardboard}. Flatten to safe space and place in your recycling bin.`
      );
    } else if (productData.recyclable_plastic !== null) {
      setPackig(productData.recyclable_plastic);
    }
  }, [productData]);
  // Функції для зміни станів при кліку на елементи опису

  const handleDescriptionClick = () => {
    setSelectedDescription("Description");
    setSelectedSustainability("");
    setSelectedCare("");
  };

  const handleSustainabilityClick = () => {
    setSelectedDescription("");
    setSelectedSustainability("Sustainability");
    setSelectedCare("");
  };

  const handleCareClick = () => {
    setSelectedDescription("");
    setSelectedSustainability("");
    setSelectedCare("Care");
  };

  useEffect(() => {
    if (brand) {
      GetCountries().then((result) => {
        const foundCountry = result.find(
          (country) => country.id === brand.country
        );

        if (foundCountry) {
          setCountry(foundCountry);
        }
      });
    }
  }, [brand]);

  useEffect(() => {
    // Перетворення значень інгредієнтів в об'єкті productData в масив
    const productIngredients = productData.ingredients
      ? productData.ingredients
          .split(",")
          .map((ingredient) => ingredient.trim())
      : [];

    // Оновлення масиву користуючись інгредієнтами та їх користю
    const updatedBenefits = [];
    ingridients.forEach((ingridient) => {
      const { ingredient_name, benefits } = ingridient;
      if (productIngredients.includes(ingredient_name)) {
        const ingridientBenefits = benefits
          .split(",")
          .map((benefit) => benefit.trim());
        updatedBenefits.push(...ingridientBenefits);
      }
    });

    // Видалення дублікатів з масиву benefits
    const uniqueBenefits = Array.from(new Set(updatedBenefits));
    setBenefits(uniqueBenefits);
  }, [productData, ingridients]);

  return (
    <div className={css.wrapFirstBlock}>
      <div className={css.smallWrap}>
        {/* <div className={css.listDesc}>
          <div
            className={`${css.oneOfDesck} ${
              selectedDescription === "Description" && css.oneOfDesckChecked
            }`}
            onClick={handleDescriptionClick}
          >
            Description
          </div>
          <div
            className={`${css.oneOfDesck} ${
              selectedSustainability === "Sustainability" &&
              css.oneOfDesckChecked
            }`}
            onClick={handleSustainabilityClick}
          >
            Sustainability
          </div>
          <div
            className={`${css.oneOfDesck} ${
              selectedCare === "Care" && css.oneOfDesckChecked
            }`}
            onClick={handleCareClick}
          >
            Care and End of Life
          </div>
        </div> */}
        {selectedDescription === "Description" && (
          <div className={css.wrapInNewProd}>
            <Ingridient productData={productData} />
            <div className={css.description}>
              <p className={css.pInDbenefits}>
                <ReactSVG src={add} className={css.addReactSVg} />
                Description
              </p>
              <div className={css.benefitsWrap}>
                {/* {benefits &&
                  benefits.map((el, index) => {
                    return (
                      <p className={css.descInBen} key={index}>
                        - {el}
                      </p>
                    );
                  })} */}
                <p className={css.descPInProd}>
                  {productData.long_description}
                </p>
              </div>
              <p className={css.pInDbenefits}>
                <ReactSVG src={add} className={css.addReactSVg} />
                How to use
              </p>
              <div className={css.benefitsWrap}>
                {/* {benefits &&
                  benefits.map((el, index) => {
                    return (
                      <p className={css.descInBen} key={index}>
                        - {el}
                      </p>
                    );
                  })} */}
                <p className={css.descPInProd}>{productData.instructions}</p>
              </div>
            </div>
          </div>
        )}
        {/* {selectedSustainability === "Sustainability" && ( */}
        <div className={css.wrapInNewProd}>
          <div className={css.wrapSubstain}>
            <div className={css.wrapLeftBlackSub}>
              <div className={css.smSubWr}>
                <p className={css.packP}>
                  <ReactSVG src={pack} className={css.packIcon} />
                  Packaging
                </p>
                <p className={css.packDesc}>· {packig}</p>
              </div>
              <div className={css.smSubWr}>
                <p className={css.packP}>
                  <ReactSVG src={pack} className={css.packIcon} />
                  Origin
                </p>
                {country && (
                  <p className={css.packDesc}>· Made in the {country.iso3}</p>
                )}
              </div>
              <div className={css.smSubWr}>
                <p className={css.packP}>
                  <ReactSVG src={without} className={css.packIcon} />
                  Made Without
                </p>
                <p className={css.packDesc}>· {productData.made_without}</p>
              </div>
              <div className={css.smSubWr}>
                <p className={css.packP}>
                  <ReactSVG src={certif} className={css.packIcon} />
                  Certifications
                </p>
                <p className={css.packDesc}>
                  {certification &&
                    certification.map((el, index) => {
                      {
                        // return <span key={index}>{el.name},&nbsp; </span>;
                        return (
                          <img
                            key={index}
                            className={css.imageSertificat}
                            alt="Certifications"
                            src={el.image}
                          />
                        );
                      }
                    })}
                </p>
              </div>
            </div>
            {/* <div className={css.wrapLeftBlackSub}></div> */}
          </div>
        </div>
        {/* )} */}
        {selectedCare === "Care" && (
          <>
            <div className={css.wrapSubstain}>
              <div className={css.wrapLeftBlackSub}>
                <div className={css.smSubWr}>
                  <p className={css.packP}>
                    <ReactSVG src={che} className={css.packIcon} />
                    Product Care
                  </p>
                  <p className={css.packDesc}>· {productData.instructions}</p>
                </div>
              </div>
              <div className={css.wrapLeftBlackSub}>
                <div className={css.smSubWr}>
                  <p className={css.packP}>
                    <ReactSVG src={delIcon} className={css.packIcon} />
                    End of Life
                  </p>
                  <p className={css.packDesc}>· {packig}</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
)(SecondBlock);

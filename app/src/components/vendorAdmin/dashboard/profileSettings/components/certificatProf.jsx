import { useEffect, useState } from "react";
import css from "../profile.module.css";
import withMySQLData from "../../../../HOK/withMySQLData";

const CertificatProf = ({ data }) => {
  const [selectedCertificates, setSelectedCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("certificates")) || [];
  });

  // Зберігаємо обрані сертифікати в localStorage
  useEffect(() => {
    localStorage.setItem("certificates", JSON.stringify(selectedCertificates));
  }, [selectedCertificates]);

  // Обробник кліку на сертифікат
  const handleCertificateClick = (item) => {
    if (selectedCertificates.includes(item.id)) {
      setSelectedCertificates(
        selectedCertificates.filter((id) => id !== item.id)
      );
    } else {
      setSelectedCertificates([...selectedCertificates, item.id]);
    }
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category_name))];
  return (
    <div className={css.certificatWrap}>
      <p className={css.mainTextPSecond}>All certifications</p>
      <div className={css.allCertificateWrap}>
        {uniqueCategories.map((category, index) => {
          const categoryItems = data.filter(
            (item) => item.category_name === category
          );

          return (
            <div key={index} className={css.wrapCert}>
              <p className={css.categoryName}>{category}</p>
              <div className={css.certifWrapAll}>
                {categoryItems.map((item) => {
                  const isSelected = selectedCertificates.includes(item.id);
                  return (
                    <p
                      key={item.id}
                      className={`${css.cerNameClick} ${
                        isSelected ? css.selectedCertificate : ""
                      }`}
                      onClick={() => handleCertificateClick(item)}
                    >
                      <img
                        src={item.image}
                        className={css.certificateImage}
                        alt="Certificate"
                      />
                    </p>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
)(CertificatProf);

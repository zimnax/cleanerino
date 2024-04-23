import { useEffect, useRef, useState } from "react";
import css from "../profile.module.css";
import withMySQLData from "../../../../HOK/withMySQLData";

const CertificatProf = ({ data }) => {
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
            <div className={css.wrapCert}>
              <p className={css.categoryName}>{category}</p>
              <div className={css.certifWrapAll}>
                {categoryItems.map((item) => {
                  const id = item.id;

                  return (
                    <p key={item.id} className={css.cerNameClick}>
                      <img src={item.image} className={css.certificateImage} />
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

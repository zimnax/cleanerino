// import withMySQLData from "../../../../../HOK/withMySQLData";
// import css from "../../../../vendorReg/vendorReg.module.css";
// import unionGreen from "../../../../../../svg/fdf.svg";
// import { ReactSVG } from "react-svg";
// import { useState } from "react";
// const Certificat = ({
//   data,
//   setActiveCategories,
//   activeCategories,
//   setActiveNames,
//   activeNames,
// }) => {
//   const handleRadioChangeTwo = () => {
//     // Перевірка, чи вже встановлений isCheckedTwo
//     if (isCheckedTwo) {
//       setActiveNames([]);
//       setActiveCategories([]);
//     } else {
//       const allNameIds = new Set(data.map((item) => item.id));
//       setActiveNames(Array.from(allNameIds));
//       setActiveCategories(
//         Array.from(new Set(data.map((item) => item.category_id)))
//       );
//     }
//     // Зміна значення isCheckedTwo
//     setIsCheckedTwo(!isCheckedTwo);
//   };

//   const [isCheckedTwo, setIsCheckedTwo] = useState(false);

//   const handleCategoryClick = (categoryId) => {
//     setActiveCategories((prevActiveCategories) => {
//       if (prevActiveCategories.includes(categoryId)) {
//         removeNamesByCategoryId(categoryId); // Видаляємо id з activeNames
//         return prevActiveCategories.filter((item) => item !== categoryId);
//       } else {
//         return [...prevActiveCategories, categoryId];
//       }
//     });
//   };

//   const handleNameClick = (categoryId, nameId) => {
//     setActiveNames((prevActiveNames) => {
//       const id = nameId;
//       const categoryItem = data.find((item) => item.id === nameId);

//       const newObj = { category: categoryId, subcategory: id };

//       if (
//         prevActiveNames.some(
//           (item) => item.category === categoryId && item.subcategory === id
//         )
//       ) {
//         return prevActiveNames.filter(
//           (item) => !(item.category === categoryId && item.subcategory === id)
//         );
//       } else {
//         return [...prevActiveNames, newObj];
//       }
//     });
//   };
//   const removeNamesByCategoryId = (categoryId) => {
//     setActiveNames((prevActiveNames) => {
//       // Пройдемося по всіх елементах даних
//       data.forEach((item) => {
//         // Якщо category_id співпадає з переданим categoryId
//         if (item.category_id === categoryId) {
//           // Видаляємо id з activeNames
//           const idToRemove = item.id;
//           prevActiveNames = prevActiveNames.filter((id) => id !== idToRemove);
//         }
//       });
//       return prevActiveNames;
//     });
//   };

//   const uniqueCategories = [...new Set(data.map((item) => item.category_name))];
//   return (
//     <div className={css.priceWrapContainer}>
//       <label className={css.labelInpBold}>Certifications</label>
//       <div className={css.priceWrapSmallWord}>
//         <div className={css.wrapApply}>
//           <p className={css.pAplly}>Apply to all of my products</p>
//           <div className={css.chaWr}>
//             <label className={css.check} onClick={handleRadioChangeTwo}>
//               <input
//                 name="refunds"
//                 type="radio"
//                 className={css.check__check}
//                 checked={isCheckedTwo}
//                 onChange={() => {}} // Порожня функція, щоб уникнути помилок
//               />
//               <span className={css.check__indicator}></span>
//             </label>
//             {!isCheckedTwo && <p className={css.of}>Off</p>}
//             {isCheckedTwo && <p className={css.on}>On</p>}
//           </div>
//         </div>
//         <div className={css.wrapCertif}>
//           {uniqueCategories.map((category, index) => {
//             const categoryItems = data.filter(
//               (item) => item.category_name === category
//             );
//             const categoryId = categoryItems[0].category_id;
//             const isActiveCategory = activeCategories.includes(categoryId);
//             return (
//               <div key={index}>
//                 <p
//                   className={
//                     isActiveCategory ? css.wrapPSertClick : css.wrapPSert
//                   }
//                   onClick={() => handleCategoryClick(categoryId)}
//                 >
//                   <div
//                     className={
//                       isActiveCategory ? css.blockApplyClick : css.blockApply
//                     }
//                   >
//                     {isActiveCategory && <ReactSVG src={unionGreen} />}
//                   </div>
//                   <p
//                     className={
//                       isActiveCategory ? css.cerNameClick : css.cerName
//                     }
//                   >
//                     {category} ({categoryItems.length})
//                   </p>
//                 </p>
//                 {isActiveCategory && (
//                   <ul className={css.ulCert}>
//                     {categoryItems.map((item) => {
//                       const id = item.id;

//                       const isActiveName = activeNames.some(
//                         (item) =>
//                           item.category === categoryId &&
//                           item.subcategory === id
//                       );
//                       return (
//                         <li
//                           key={item.id}
//                           className={
//                             isActiveName ? css.cerNameClick : css.cerName
//                           }
//                           onClick={() => handleNameClick(categoryId, item.id)}
//                         >
//                           <img
//                             src={item.image}
//                             alt="Certificat Image"
//                             className={
//                               isActiveName
//                                 ? css.certStyleProdClick
//                                 : css.certStyleProd
//                             }
//                           />
//                         </li>
//                       );
//                     })}
//                   </ul>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default withMySQLData(
//   `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
// )(Certificat);
import withMySQLData from "../../../../../HOK/withMySQLData";
import css from "../../../../vendorReg/vendorReg.module.css";
import unionGreen from "../../../../../../svg/fdf.svg";
import { ReactSVG } from "react-svg";
import { useState, useEffect } from "react";

const Certificat = ({
  data,
  setActiveCategories,
  activeCategories,
  setActiveNames,
  activeNames,
}) => {
  const [isCheckedTwo, setIsCheckedTwo] = useState(() => {
    return localStorage.getItem("useCertificates") ? true : false;
  });

  useEffect(() => {
    if (isCheckedTwo) {
      const savedCertificates =
        JSON.parse(localStorage.getItem("useCertificates")) || [];
      const savedCategories = Array.from(
        new Set(savedCertificates.map((item) => item.category))
      );
      setActiveCategories(savedCategories);
      setActiveNames(savedCertificates);
    }
  }, [isCheckedTwo, setActiveCategories, setActiveNames]);

  const handleRadioChangeTwo = () => {
    if (isCheckedTwo) {
      localStorage.removeItem("useCertificates");
      setActiveNames([]);
      setActiveCategories([]);
    } else {
      const allNames = data.map((item) => ({
        category: item.category_id,
        subcategory: item.id,
      }));
      localStorage.setItem("useCertificates", JSON.stringify(allNames));
      const allCategoryIds = Array.from(
        new Set(data.map((item) => item.category_id))
      );
      setActiveNames(allNames);
      setActiveCategories(allCategoryIds);
    }
    setIsCheckedTwo(!isCheckedTwo);
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategories((prevActiveCategories) => {
      if (prevActiveCategories.includes(categoryId)) {
        removeNamesByCategoryId(categoryId); // Видаляємо id з activeNames
        return prevActiveCategories.filter((item) => item !== categoryId);
      } else {
        return [...prevActiveCategories, categoryId];
      }
    });
  };

  const handleNameClick = (categoryId, nameId) => {
    setActiveNames((prevActiveNames) => {
      const newObj = { category: categoryId, subcategory: nameId };

      let updatedActiveNames;
      if (
        prevActiveNames.some(
          (item) => item.category === categoryId && item.subcategory === nameId
        )
      ) {
        updatedActiveNames = prevActiveNames.filter(
          (item) =>
            !(item.category === categoryId && item.subcategory === nameId)
        );
      } else {
        updatedActiveNames = [...prevActiveNames, newObj];
      }

      // Оновлюємо localStorage тільки якщо isCheckedTwo активний
      if (isCheckedTwo) {
        localStorage.setItem(
          "useCertificates",
          JSON.stringify(updatedActiveNames)
        );
      }
      return updatedActiveNames;
    });
  };

  const removeNamesByCategoryId = (categoryId) => {
    setActiveNames((prevActiveNames) => {
      const updatedActiveNames = prevActiveNames.filter(
        (item) => item.category !== categoryId
      );
      if (isCheckedTwo) {
        localStorage.setItem(
          "useCertificates",
          JSON.stringify(updatedActiveNames)
        );
      }
      return updatedActiveNames;
    });
  };

  const uniqueCategories = [...new Set(data.map((item) => item.category_name))];
  console.log("active", activeNames);
  return (
    <div className={css.priceWrapContainer}>
      <label className={css.labelInpBold}>Certifications</label>
      <div className={css.priceWrapSmallWord}>
        <div className={css.wrapApply}>
          <p className={css.pAplly}>Apply to all of my products</p>
          <div className={css.chaWr}>
            <label className={css.check} onClick={handleRadioChangeTwo}>
              <input
                name="refunds"
                type="radio"
                className={css.check__check}
                checked={isCheckedTwo}
                onChange={() => {}} // Порожня функція, щоб уникнути помилок
              />
              <span className={css.check__indicator}></span>
            </label>
            {!isCheckedTwo && <p className={css.of}>Off</p>}
            {isCheckedTwo && <p className={css.on}>On</p>}
          </div>
        </div>
        <div className={css.wrapCertif}>
          {uniqueCategories.map((category, index) => {
            const categoryItems = data.filter(
              (item) => item.category_name === category
            );
            const categoryId = categoryItems[0].category_id;
            const isActiveCategory = activeCategories.includes(categoryId);
            return (
              <div key={index}>
                <p
                  className={
                    isActiveCategory ? css.wrapPSertClick : css.wrapPSert
                  }
                  onClick={() => handleCategoryClick(categoryId)}
                >
                  <div
                    className={
                      isActiveCategory ? css.blockApplyClick : css.blockApply
                    }
                  >
                    {isActiveCategory && <ReactSVG src={unionGreen} />}
                  </div>
                  <p
                    className={
                      isActiveCategory ? css.cerNameClick : css.cerName
                    }
                  >
                    {category} ({categoryItems.length})
                  </p>
                </p>
                {isActiveCategory && (
                  <ul className={css.ulCert}>
                    {categoryItems.map((item) => {
                      const id = item.id;

                      const isActiveName = activeNames.some(
                        (activeItem) =>
                          activeItem.category === categoryId &&
                          activeItem.subcategory === id
                      );
                      return (
                        <li
                          key={item.id}
                          className={
                            isActiveName ? css.cerNameClick : css.cerName
                          }
                          onClick={() => handleNameClick(categoryId, item.id)}
                        >
                          <img
                            src={item.image}
                            alt="Certificat Image"
                            className={
                              isActiveName
                                ? css.certStyleProdClick
                                : css.certStyleProd
                            }
                          />
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
)(Certificat);

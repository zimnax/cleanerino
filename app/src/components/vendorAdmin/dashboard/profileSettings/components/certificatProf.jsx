// import { useEffect, useState } from "react";
// import css from "../profile.module.css";
// import withMySQLData from "../../../../HOK/withMySQLData";

// const CertificatProf = ({ data, users }) => {
//   const [selectedCertificates, setSelectedCertificates] = useState(() => {
//     return JSON.parse(localStorage.getItem("certificates")) || [];
//   });

//   // Зберігаємо обрані сертифікати в localStorage
//   useEffect(() => {
//     localStorage.setItem("certificates", JSON.stringify(selectedCertificates));
//   }, [selectedCertificates]);

//   // Обробник кліку на сертифікат
//   const handleCertificateClick = (item) => {
//     console.log("item", item);
//     if (selectedCertificates.includes(item.id)) {
//       setSelectedCertificates(
//         selectedCertificates.filter((id) => id !== item.id)
//       );
//     } else {
//       setSelectedCertificates([...selectedCertificates, item.id]);
//     }
//   };

//   const uniqueCategories = [...new Set(data.map((item) => item.category_name))];
//   console.log("uniqueCategories", data);
//   return (
//     <div className={css.certificatWrap}>
//       <p className={css.mainTextPSecond}>All certifications</p>
//       <div className={css.allCertificateWrap}>
//         {uniqueCategories.map((category, index) => {
//           const categoryItems = data.filter(
//             (item) => item.category_name === category
//           );
//           console.log("categoryItems", categoryItems);
//           return (
//             <div key={index} className={css.wrapCert}>
//               <p className={css.categoryName}>{category}</p>
//               <div className={css.certifWrapAll}>
//                 {categoryItems.map((item) => {
//                   const isSelected = selectedCertificates.includes(item.id);
//                   return (
//                     <p
//                       key={item.id}
//                       className={`${css.cerNameClick} ${
//                         isSelected ? css.selectedCertificate : ""
//                       }`}
//                       onClick={() => handleCertificateClick(item)}
//                     >
//                       <img
//                         src={item.image}
//                         className={css.certificateImage}
//                         alt="Certificate"
//                       />
//                     </p>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default withMySQLData(
//   `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
// )(CertificatProf);
// import { useEffect, useState } from "react";
// import css from "../profile.module.css";
// import withMySQLData from "../../../../HOK/withMySQLData";
// import axios from "axios";

// const CertificatProf = ({ data, users }) => {
//   const [selectedCertificates, setSelectedCertificates] = useState([]);
//   const [allCertificat, setAllCertificat] = useState(null);
//   console.log("users", users);
//   useEffect(() => {
//     // Завантаження сертифікатів користувача при завантаженні компоненти
//     const fetchUserCertificates = async () => {
//       try {
//         const response = await axios.get(
//           `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications/${users.id}`
//         );
//         setAllCertificat(response.data);
//         const userCertificates = response.data.map(
//           (cert) => cert.certificat_id
//         );
//         console.log("response.data", response.data);

//         setSelectedCertificates(userCertificates);
//       } catch (error) {
//         // console.error("Error fetching user certificates:", error);
//       }
//     };
//     if (users) {
//       fetchUserCertificates();
//     }
//   }, [users]);

//   // Обробник кліку на сертифікат
//   const handleCertificateClick = async (item) => {
//     console.log("PerefIs", selectedCertificates);
//     const isSelected = selectedCertificates.some((cert) => cert === item.id);
//     console.log("pisla", selectedCertificates);
//     let certToDelete;
//     console.log("allCertificat", allCertificat);
//     if (isSelected) {
//       certToDelete = allCertificat.find(
//         (cert) => cert.certificat_id === item.id
//       );
//     }
//     console.log("item", item);
//     if (isSelected) {
//       try {
//         // Видалення сертифікату
//         await axios.delete(
//           `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications/${certToDelete.id}`
//         );
//         setSelectedCertificates(
//           selectedCertificates.filter((id) => id !== item.id)
//         );
//       } catch (error) {
//         console.error("Error removing certificate:", error);
//       }
//     } else {
//       try {
//         // Додавання сертифікату
//         await axios.post(
//           `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications`,
//           { vendor_id: users.id, certificat_id: item.id }
//         );
//         setSelectedCertificates([...selectedCertificates, item.id]);
//       } catch (error) {
//         console.error("Error adding certificate:", error);
//       }
//     }
//   };

//   const uniqueCategories = [...new Set(data.map((item) => item.category_name))];
//   return (
//     <div className={css.certificatWrap}>
//       <p className={css.mainTextPSecond}>All certifications</p>
//       <div className={css.allCertificateWrap}>
//         {uniqueCategories.map((category, index) => {
//           const categoryItems = data.filter(
//             (item) => item.category_name === category
//           );
//           return (
//             <div key={index} className={css.wrapCert}>
//               <p className={css.categoryName}>{category}</p>
//               <div className={css.certifWrapAll}>
//                 {categoryItems.map((item) => {
//                   const isSelected = selectedCertificates.includes(item.id);
//                   return (
//                     <p
//                       key={item.id}
//                       className={`${css.cerNameClick} ${
//                         isSelected ? css.selectedCertificate : ""
//                       }`}
//                       onClick={() => handleCertificateClick(item)}
//                     >
//                       <img
//                         src={item.image}
//                         className={css.certificateImage}
//                         alt="Certificate"
//                       />
//                     </p>
//                   );
//                 })}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default withMySQLData(
//   `${process.env.REACT_APP_API_URL}/api/v1/vendor/product/certificates`
// )(CertificatProf);
import { useEffect, useState } from "react";
import css from "../profile.module.css";
import withMySQLData from "../../../../HOK/withMySQLData";
import axios from "axios";

const CertificatProf = ({ data, users }) => {
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [allCertificat, setAllCertificat] = useState(null);

  const fetchUserCertificates = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications/${users.id}`
      );
      setAllCertificat(response.data);
      const userCertificates = response.data.map((cert) => cert.certificat_id);

      setSelectedCertificates(userCertificates);
    } catch (error) {}
  };

  useEffect(() => {
    if (users) {
      fetchUserCertificates();
    }
  }, [users]);

  // Обробник кліку на сертифікат
  const handleCertificateClick = async (item) => {
    const isSelected = selectedCertificates.some((cert) => cert === item.id);
    let certToDelete;
    if (isSelected && allCertificat) {
      certToDelete = allCertificat.find(
        (cert) => cert.certificat_id === item.id
      );
    }
    if (isSelected) {
      try {
        // Видалення сертифікату
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications/${certToDelete.id}`
        );
        setSelectedCertificates(
          selectedCertificates.filter((id) => id !== item.id)
        );
      } catch (error) {
        console.error("Error removing certificate:", error);
      }
    } else {
      try {
        // Додавання сертифікату
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/vendor/certifications`,
          { vendor_id: users.id, certificat_id: item.id }
        );
        setSelectedCertificates([...selectedCertificates, item.id]);
      } catch (error) {
        console.error("Error adding certificate:", error);
      }
    }
    // Оновлення даних після додавання або видалення сертифіката
    fetchUserCertificates();
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

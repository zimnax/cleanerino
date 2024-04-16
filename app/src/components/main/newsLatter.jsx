// import { useState } from "react";
// import css from "./main.module.css";
// import { ReactSVG } from "react-svg";
// import arrowSe from "../../svg/svgFor/ArroSendNews.svg";
// const NewsLatter = () => {
//   const [email, setEmail] = useState("");
//   return (
//     <div className={css.wrapNewsLatter}>
//       <p className={css.joinP}>Join our Newsletter</p>
//       <p className={css.joinPDesc}>
//         Get the latest updates, promotions, events and more!
//       </p>
//       <div className={css.wrapSendNews}>
//         <input
//           className={css.newsInput}
//           value={email}
//           placeholder="Enter Email Address"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <div className={css.sendNewsP}>
//           <ReactSVG src={arrowSe} className={css.arrowSendM} />
//         </div>
//       </div>
//     </div>
//   );
// };
// export default NewsLatter;
import { useState } from "react";
import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import Swal from "sweetalert2";
import emailValidator from "email-validator";
import axios from "axios";
import arrowSe from "../../svg/svgFor/ArroSendNews.svg";

const NewsLatter = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!emailValidator.validate(email)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#609966",
      });
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}:4000/api/v1/users/newsletter`,
        { email }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Subscription Successful",
          text: response.data.message,
          confirmButtonColor: "#609966",
        });
        setEmail(""); // Очищення поля email після успішної підписки
      } else {
        Swal.fire({
          icon: "error",
          title: "Subscription Failed",
          text: response.data.message,
          confirmButtonColor: "#609966",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Subscription Failed",
        text: "An error occurred while processing your request. Please try again later.",
        confirmButtonColor: "#609966",
      });
    }
  };

  return (
    <div className={css.wrapNewsLatter}>
      <p className={css.joinP}>Join our Newsletter</p>
      <p className={css.joinPDesc}>
        Get the latest updates, promotions, events and more!
      </p>
      <div className={css.wrapSendNews}>
        <input
          className={css.newsInput}
          value={email}
          placeholder="Enter Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={css.sendNewsP} onClick={handleSubscribe}>
          <ReactSVG src={arrowSe} className={css.arrowSendM} />
        </div>
      </div>
    </div>
  );
};

export default NewsLatter;

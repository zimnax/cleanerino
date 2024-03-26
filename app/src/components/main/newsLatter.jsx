import { useState } from "react";
import css from "./main.module.css";
import { ReactSVG } from "react-svg";
import arrowSe from "../../svg/svgFor/ArroSendNews.svg";
const NewsLatter = () => {
  const [email, setEmail] = useState("");
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
        />
        <div className={css.sendNewsP}>
          <ReactSVG src={arrowSe} className={css.arrowSendM} />
        </div>
      </div>
    </div>
  );
};
export default NewsLatter;

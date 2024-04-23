import css from "./header.module.css";
import { AiOutlineClose, AiOutlineWhatsApp, AiFillPhone } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Menu({ setOpenContact }) {
  return (
    <section className={css.contactWrap}>
      <div className={css.smallWrap}>
        <AiOutlineClose
          className={css.aiOutlineClose}
          onClick={() => setOpenContact(false)}
        />
        <p className={css.pMainInPop}>Navigation</p>
        <ul className={css.navigationUl}>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/">
              Main
            </Link>
          </li>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/catalog">
              Catalog
            </Link>
          </li>{" "}
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/about">
              About
            </Link>
          </li>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/contact">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

import css from "./header.module.css";
import { AiOutlineClose, AiOutlineWhatsApp, AiFillPhone } from "react-icons/ai";
import { FaViber } from "react-icons/fa";
import { PiTelegramLogoLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import logo from "../../svg/cleanerinogreen 1.svg";
export default function Menu({ setOpenContact }) {
  return (
    <section className={css.contactWrap}>
      <div className={css.smallWrap}>
        <AiOutlineClose
          className={css.aiOutlineClose}
          onClick={() => setOpenContact(false)}
        />
        <Link to="/">
          <ReactSVG src={logo} />
        </Link>

        {/* <p className={css.pMainInPop}>Navigation</p> */}
        <ul className={css.navigationUl}>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/">
              Main
            </Link>
          </li>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/shop">
              Shop
            </Link>
          </li>{" "}
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/about">
              About
            </Link>
          </li>
          <li className={css.liNavI}>
            <Link className={css.liNavI} to="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

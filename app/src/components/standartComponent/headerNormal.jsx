import css from "./header.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../svg/logo-inline.svg";
import { Link } from "react-router-dom";
import arrow from "../../svg/ChevronForHeader.svg";
import userIcon from "../../svg/UserForHead.svg";
import cardIcon from "../../svg/cardHeader.svg";
const HeaderNormal = () => {
  return (
    <header className={css.wrapHeaderAll}>
      <div className={css.wrapDiscountHead}>
        <p className={css.pForSale}>
          Random sale offer 50% off from 20 December.
        </p>
      </div>
      <div className={css.wrapHeader}>
        <Link to="/">
          <ReactSVG src={logo} />
        </Link>
        <nav className={css.navigation}>
          <ul className={css.ulNavInHeader}>
            <li className={css.linkLi}>
              <Link to="" className={css.linkLi}>
                About Us
              </Link>
            </li>
            <li className={css.linkLi}>
              Resources <ReactSVG src={arrow} />
            </li>
            <li className={css.linkLi}>
              <Link to="" className={css.linkLi}>
                Contact
              </Link>
            </li>
            <li className={css.linkLiLogin}>
              <Link to="/signin" className={css.linkLi}>
                <ReactSVG src={userIcon} className={css.logIcon} />
                Login
              </Link>
            </li>
            <li className={css.linkLi}>
              <ReactSVG src={cardIcon} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
export default HeaderNormal;

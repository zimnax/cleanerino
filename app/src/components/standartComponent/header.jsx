import css from "./header.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../svg/cleanerinogreen 1.svg";
import { Link } from "react-router-dom";
import arrow from "../../svg/ChevronForHeader.svg";
import userIcon from "../../svg/UserForHead.svg";
import cardIcon from "../../svg/cardHeader.svg";
import arrowDHeader from "../../svg/arrowDheader.svg";
import searchIcon from "../../svg/searchHeader.svg";
import flower from "../../svg/flower.svg";
import heart from "../../svg/heartIcon.svg";
import { useEffect, useState } from "react";
import house from "../../svg/houseIcon.svg";
import cart from "../../svg/cartIconH.svg";
import withMySQLData from "../HOK/withMySQLData";
const Header = ({ activeUser, data }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);

  useEffect(() => {
    if (activeUser && data && data.users) {
      const found = data.users.find(
        (item) => item.firebaseId === activeUser.uid
      );

      setUsers(found);
    }
  }, [data, activeUser]);

  return (
    <header className={css.wrapHeaderAllNew}>
      <div className={css.wrapHeaderNew}>
        <Link to="/">
          <ReactSVG src={logo} />
        </Link>
        <div className={css.wrapShopCategory}>
          <p className={css.shapCatP}>Shop Categories</p>
          <ReactSVG src={arrowDHeader} className={css.iconArrowD} />
        </div>
        <div className={css.wrapInputSearch}>
          <input
            className={css.inputHeader}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for your new favorite..."
          />
          <button className={css.newSearchHeader}>
            <ReactSVG src={searchIcon} className={css.searchIconHeader} />
          </button>
        </div>
        <div className={css.wrapIconsHeader}>
          {users && (
            <div className={css.wrapavatarName}>
              <div className={css.wrapavatarName}>
                <ReactSVG src={arrowDHeader} className={css.iconArrowDR} />
                <p className={css.nameP}>{users.user_name}</p>
              </div>
            </div>
          )}
          {!users && (
            <div className={css.wrapavatarName}>
              <div className={css.wrapavatarName}>
                <Link to={``} className={css.nameP}>
                  Login
                </Link>
              </div>
            </div>
          )}
          {users && (
            <div className={css.wrapPhoto}>
              {users.photo && (
                <img className={css.userPhoto} src={users.photo} alt="photo" />
              )}
              {!users.photo && (
                <div className={css.withoutPhoto}>{users.user_name[0]}</div>
              )}
            </div>
          )}
          <div className={css.wrapAllIcons}>
            <ReactSVG src={house} />
            <div className={css.elipse}></div>
          </div>
          <div className={css.werticalLine}></div>
          <div className={css.wrapAllIcons}>
            <ReactSVG src={flower} />
            <div className={css.elipse}></div>
          </div>
          <div className={css.wrapAllIcons}>
            <ReactSVG src={heart} />
            <div className={css.elipse}></div>
          </div>
          <Link to="/cart">
            <div className={css.wrapAllIcons}>
              <ReactSVG src={cart} />
              <div className={css.elipse}></div>
            </div>
          </Link>
        </div>

        {/* <nav className={css.navigation}>
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
        </nav> */}
      </div>
    </header>
  );
};
export default withMySQLData("http://localhost:4000/api/v1/users/profile")(
  Header
);

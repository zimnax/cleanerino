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
import axios from "axios";
import { useDispatch } from "react-redux";
import { setText } from "../../function/textSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import cartSlice from "../../function/cartSlice";
import { addToCart } from "../../function/cartSlice";
import Menu from "./menu";
const HeaderModernWhite = ({ activeUser, data, totalQuantity }) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [openContact, setOpenContact] = useState(false);
  const [counterCart, serCounterCart] = useState(0);
  const dispatch = useDispatch();

  const text = useSelector((state) => state.cartSlice);
  const open = () => {
    setOpenContact(true);
  };
  // useEffect(() => {
  //   console.log("text", text);
  //   const totalQuantity = text.items.reduce(
  //     (total, item) => parseInt(total) + parseInt(item.quantity),
  //     0
  //   );
  //   serCounterCart(totalQuantity);
  // }, [text.items]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        let found = null;
        if (activeUser && data && data.users) {
          found = data.users.find((item) => item.firebaseId === activeUser.uid);
        } else {
        }

        if (found !== undefined) {
          // Якщо користувача знайдено, виконайте потрібні дії тут
          setUsers(found);
        } else if (activeUser) {
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/v1/vendor/profile`
          );
          const dataUser = response.data;

          if (dataUser) {
            found = dataUser.find(
              (item) => item.firebase_id === activeUser.uid
            );
          }
          setVendor(found);
        }
      } catch (error) {
        // Обробка помилок запиту
        console.error("Error fetching data:", error);
      }
    };

    // Виклик функції для виконання запиту при завантаженні компоненту або зміні залежностей
    fetchData();
  }, [data, activeUser]);
  const handleInputChange = (e) => {
    setSearch(e.target.value);
    dispatch(setText(e.target.value)); // Відправляємо значення в редуктор
  };
  const sendData = () => {
    navigate("/shop");
  };
  return (
    <header className={css.wrapHeaderAllModern}>
      <div className={css.wrapHeaderModern}>
        <Link to="/">
          <ReactSVG src={logo} />
        </Link>
        {/* <div className={css.wrapShopCategory}>
          <p className={css.shapCatP}>Shop Categories</p>
          <ReactSVG src={arrowDHeader} className={css.iconArrowD} />
        </div> */}
        <div className={css.wrapInputSearch}>
          <input
            className={css.inputHeaderModern}
            value={search}
            onChange={handleInputChange}
            placeholder="Search for your new favorite..."
          />
          <button className={css.newSearchHeader} onClick={sendData}>
            <ReactSVG src={searchIcon} className={css.searchIconHeader} />
          </button>
        </div>
        <div className={css.wrapIconsHeader}>
          {users && (
            <Link className={css.nameP} to={`/user/cabinet`}>
              <div className={css.wrapavatarName}>
                <div className={css.wrapavatarName}>
                  <p className={css.nameP}>{users.user_name}</p>
                </div>
              </div>
            </Link>
          )}
          {vendor && (
            <Link className={css.nameP} to={`/vendor/dashboard`}>
              <div className={css.wrapavatarName}>
                <div className={css.wrapavatarName}>
                  <p className={css.nameP}>{vendor.first_name}</p>
                </div>
              </div>
            </Link>
          )}
          {!users && !vendor && (
            <div className={css.wrapavatarName}>
              <div className={css.wrapavatarName}>
                <Link to={`/signin`} className={css.nameP}>
                  Login
                </Link>
              </div>
            </div>
          )}

          <div className={css.wrapPhoto}>
            {vendor && vendor.first_name !== "" && (
              <>
                {vendor.photo && (
                  <img
                    className={css.userPhoto}
                    src={vendor.photo}
                    alt="photo"
                  />
                )}
                {!vendor.photo && (
                  <div className={css.withoutPhoto}>{vendor.first_name[0]}</div>
                )}
              </>
            )}
            {users && users.user_name !== "" && (
              <Link to={`/user/cabinet`}>
                {users.photo && (
                  <img
                    className={css.userPhoto}
                    src={users.photo}
                    alt="photo"
                  />
                )}
                {!users.photo && (
                  <div className={css.withoutPhoto}>{users.user_name[0]}</div>
                )}
              </Link>
            )}
          </div>
          {vendor && (
            <Link to="/vendor/dashboard">
              <div className={css.wrapAllIcons}>
                <ReactSVG src={house} />
                <div className={css.elipse}></div>
              </div>
            </Link>
          )}
          <div className={css.werticalLine}></div>
          {/* <div className={css.wrapAllIcons}>
            <ReactSVG src={flower} />
            <div className={css.elipse}></div>
          </div> */}
          <div className={css.wrapAllIcons}>
            <ReactSVG src={heart} />
            <div className={css.elipse}></div>
          </div>
          <Link to="/cart">
            <div className={css.wrapAllIcons}>
              <ReactSVG src={cart} />
              <div className={css.elipse}>
                {" "}
                <p className={css.countCart}>{totalQuantity}</p>
              </div>
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
      <div className={css.hamburgerWr} onClick={open}>
        <span className={css.hambSpFirs}></span>
        <span className={css.hambSpSecont}></span>
        <span className={css.hambSpThre}></span>
      </div>
      {openContact && <Menu setOpenContact={setOpenContact} />}
    </header>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(HeaderModernWhite);

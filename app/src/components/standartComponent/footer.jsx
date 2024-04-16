import css from "./footer.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../svg/svgFor/logoForFooter.svg";
import social from "../../svg/svgFor/SocialIcons.svg";
const Footer = () => {
  return (
    <footer className={css.mainFooter}>
      <div className={css.smallWrap}>
        <div className={css.firstBlockWrap}>
          <ReactSVG src={logo} />
          <p className={css.descInFooter}>
            Join our growing community of other like minded makers and customers
            connected through a passion for safe natural products and the planet
          </p>
          <div className={css.socialWrap}>
            <ReactSVG src={social} />
          </div>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>About</p>
          <p className={css.mainPSecond}>Our Philosophy</p>
          <p className={css.mainPSecond}>Blog</p>
          <p className={css.mainPSecond}>Resources</p>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Support</p>
          <p className={css.mainPSecond}>FAQs</p>
          <p className={css.mainPSecond}>Contact</p>
          <p className={css.mainPSecond}>Shipping & Returns</p>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Terms</p>
          <p className={css.mainPSecond}>Terms of Use</p>
          <p className={css.mainPSecond}>Privacy Policy</p>
          <p className={css.mainPSecond}>Vendor Policy</p>
        </div>
      </div>
      <p className={css.allRights}>© 2024 Clean Free. All Rights Reserved.</p>
    </footer>
  );
};
export default Footer;

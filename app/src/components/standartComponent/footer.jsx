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
          <p className={css.mainPLite}>Clean Free</p>
          <p className={css.mainPSecond}>How it works</p>
          <p className={css.mainPSecond}>About Us</p>
          <p className={css.mainPSecond}>Sustainability</p>
          <p className={css.mainPSecond}>Blog</p>
          <p className={css.mainPSecond}>Buying Local</p>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Support</p>
          <p className={css.mainPSecond}>FAQs</p>
          <p className={css.mainPSecond}>Contact</p>
          <p className={css.mainPSecond}>Shipping</p>
          <p className={css.mainPSecond}>Payment</p>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Terms</p>
          <p className={css.mainPSecond}>Terms & Conditions</p>
          <p className={css.mainPSecond}>Return Policy</p>
          <p className={css.mainPSecond}>Privacy Policy</p>
          <p className={css.mainPSecond}>Affiliate Program</p>
          <p className={css.mainPSecond}>Partnerships</p>
        </div>
      </div>
      <p className={css.allRights}>© 2024 Clean Free. All Rights Reserved.</p>
    </footer>
  );
};
export default Footer;

import css from "./footer.module.css";
import { ReactSVG } from "react-svg";
import logo from "../../svg/svgFor/logoForFooter.svg";
import facebook from "../../svg/facebook.svg";
import instagram from "../../svg/instagram.svg";
import linked from "../../svg/linked.svg";
import youtube from "../../svg/youtubeFooter.svg";
import { Link } from "react-router-dom";
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
            <a
              href="https://www.facebook.com/profile.php?id=61551860430923"
              target="_blanck"
            >
              <ReactSVG src={facebook} className={css.facebook} />
            </a>
            <a
              href="https://www.instagram.com/the_cleanerino/"
              target="_blanck"
            >
              <ReactSVG src={instagram} className={css.facebook} />
            </a>
            <a
              href="https://www.linkedin.com/company/cleanerino/"
              target="_blanck"
            >
              <ReactSVG src={linked} className={css.facebook} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCizn6WBUEP4m-k2Y-_aPmKA"
              target="_blanck"
            >
              <ReactSVG src={youtube} className={css.youtube} />
            </a>
          </div>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>About</p>

          <Link to="/about" className={css.mainPSecond}>
            Our Philosophy
          </Link>
          <p className={css.mainPSecond}>Blog</p>
          <p className={css.mainPSecond}>Resources</p>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Support</p>
          <Link to="/privacy" className={css.mainPSecond}>
            FAQs
          </Link>
          <Link to="/contact" className={css.mainPSecond}>
            Contact
          </Link>
          <Link to="/privacy" className={css.mainPSecond}>
            Shipping & Returns
          </Link>
        </div>
        <div className={css.firstBlockWrap}>
          <p className={css.mainPLite}>Terms</p>
          <Link to="/privacy" className={css.mainPSecond}>
            Terms of Use
          </Link>
          <Link to="/privacy" className={css.mainPSecond}>
            Privacy Policy
          </Link>
          <Link to="/privacy" className={css.mainPSecond}>
            Vendor Policy
          </Link>
        </div>
      </div>
      <p className={css.allRights}>
        © 2024 Cleanerino Free. All Rights Reserved.
      </p>
    </footer>
  );
};
export default Footer;

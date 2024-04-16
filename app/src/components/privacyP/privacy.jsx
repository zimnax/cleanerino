import { useState } from "react";
import HeaderNormal from "../standartComponent/headerNormal";
import css from "./privacy.module.css";
import FaqTe from "./faqTe";
import TermOfUse from "./termOfUse";
import PrivacyPalis from "./privacyPalis";
import RegionalPriv from "./regionalPriv";
import NonDisc from "./nonDisc";
import VendorPoly from "./vendorPoly";
import Footer from "../standartComponent/footer";
import HeaderModernWhite from "../standartComponent/headerModernWhite";
const Privacy = ({ totalQuantity, activeUser }) => {
  const [faq, setFaq] = useState(true);
  const [ship, setShip] = useState(false);
  const [payment, setPayment] = useState(false);
  const [terms, setTerms] = useState(false);
  const [returns, setReturns] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const faqFun = () => {
    setFaq(true);
    setShip(false);
    setPayment(false);
    setTerms(false);
    setReturns(false);
    setPrivacy(false);
  };
  const shipFun = () => {
    setFaq(false);
    setShip(true);
    setPayment(false);
    setTerms(false);
    setReturns(false);
    setPrivacy(false);
  };
  const payFun = () => {
    setFaq(false);
    setShip(false);
    setPayment(true);
    setTerms(false);
    setReturns(false);
    setPrivacy(false);
  };
  const termsFun = () => {
    setFaq(false);
    setShip(false);
    setPayment(false);
    setTerms(true);
    setReturns(false);
    setPrivacy(false);
  };
  const returnsFun = () => {
    setFaq(false);
    setShip(false);
    setPayment(false);
    setTerms(false);
    setReturns(true);
    setPrivacy(false);
  };
  const privacyFun = () => {
    setFaq(false);
    setShip(false);
    setPayment(false);
    setTerms(false);
    setReturns(false);
    setPrivacy(true);
  };
  return (
    <>
      <HeaderModernWhite
        totalQuantity={totalQuantity}
        activeUser={activeUser}
      />
      <div className={css.privacyWrap}>
        <div className={css.wrapsmalPriv}>
          <div className={css.wrapFirstBlock}>
            <p className={css.firstTextSuport}>Support</p>
            <p
              className={faq ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={faqFun}
            >
              FAQs
            </p>

            <p className={css.firstTextSuport}>Terms</p>
            <p
              className={ship ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={shipFun}
            >
              Terms of Use
            </p>
            <p
              className={payment ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={payFun}
            >
              Privacy Policy
            </p>
            <p
              className={terms ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={termsFun}
            >
              Regional Privacy Policy
            </p>
            <p
              className={returns ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={returnsFun}
            >
              Non-discrimination Policy
            </p>
            <p
              className={privacy ? css.suporsChoiseGreen : css.suporsChoise}
              onClick={privacyFun}
            >
              Vendor Policy
            </p>
          </div>
          <div className={css.wrapBlockText}>
            {faq && <FaqTe />}
            {ship && <TermOfUse />}
            {payment && <PrivacyPalis />}
            {terms && <RegionalPriv />}
            {returns && <NonDisc />}
            {privacy && <VendorPoly />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Privacy;

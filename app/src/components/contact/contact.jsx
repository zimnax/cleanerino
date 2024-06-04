import HeaderModernWhite from "../standartComponent/headerModernWhite";
import Footer from "../standartComponent/footer";

import css from "./contact.module.css";
const Contact = ({ activeUser, totalQuantity }) => {
  return (
    <>
      <HeaderModernWhite
        activeUser={activeUser}
        totalQuantity={totalQuantity}
      />
      <div className={css.wrapContact}>
        <div className={css.wrapSmallContact}>
          {/* <div className={css.firstBlockCont}>
            <div className={css.vendorSuportB}>
              <p className={css.titleSuportM}>Vendor Support</p>
              <p className={css.descPSupF}>
                Need help setting up or running a store on Cleanerino? Reach us
                at
              </p>
              <p className={css.descPSupT}>support@cleanerino.com</p>
            </div>
            <div className={css.vendorSuportBS}>
              <p className={css.titleSuportM}>Wholesale</p>
              <p className={css.descPSupF}>
                If you’re interesting to purchase wholesale, send us a note to
              </p>
              <p className={css.descPSupT}>wholesale@cleanerino.com</p>
            </div>
          </div> */}
          <div className={css.wrapForm}>
            <div className={css.wrapNameCont}>
              <p className={css.titleContact}>Contact Us</p>
              <p className={css.descPSupF}>
                For technical support and general inquiries, contact us at
                hello@cleanerino.com or fill our the form below.
              </p>
            </div>
            <div className={css.wrapInputs}>
              <div className={css.wrapTwoInputs}>
                <input className={css.smallInput} placeholder="First Name" />
                <input className={css.smallInput} placeholder="Last Name" />
              </div>
              <input className={css.inputBig} placeholder="Email Address" />
              <textarea
                className={css.textAreaBix}
                placeholder="How Can We Help You? (Max. 500 Characters)"
              />
            </div>
            <div className={css.buttonSabmit}>Submit</div>
          </div>
        </div>
      </div>
      ;
      <Footer />
    </>
  );
};
export default Contact;

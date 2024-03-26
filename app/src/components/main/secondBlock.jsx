import CertificateList from "./certificatList";
import DoorsToWord from "./doorsToWord";
import Faq from "./faq";
import css from "./main.module.css";
import NewsLatter from "./newsLatter";
import ProductList from "./productList";
import ToOutPhi from "./toOurPhi";
import VendorsBlock from "./vendorsBlock";
import VideoBlock from "./videoBlock";
import { ReactSVG } from "react-svg";
import first from "../../svg/vector/firstV.svg";
import second from "../../svg/vector/secondV.svg";
import thre from "../../svg/vector/thre.svg";
import fourV from "../../svg/vector/four.svg";
import fiveV from "../../svg/vector/five.svg";
import sixV from "../../svg/vector/sixV.svg";
import sevenV from "../../svg/vector/seven.svg";
import eigthV from "../../svg/vector/eigth.svg";
import nineV from "../../svg/vector/nine.svg";
import tenV from "../../svg/vector/ten.svg";
import newOne from "../../svg/vector/newOne.svg";
import newTwo from "../../svg/vector/newTwo.svg";
import newThre from "../../svg/vector/newThre.svg";
import newFour from "../../svg/vector/newFour.svg";
import newFive from "../../svg/vector/newFive.svg";
import newSix from "../../svg/vector/newSix.svg";
import newSeven from "../../svg/vector/newSeven.svg";
import newEight from "../../svg/vector/newEight.svg";
import newNine from "../../svg/vector/newNine.svg";
import newTen from "../../svg/vector/newTen.svg";

const SecondBlock = () => {
  return (
    <div className={css.allMainWrap}>
      <CertificateList />
      <ToOutPhi />
      <ProductList />
      <VendorsBlock />
      <DoorsToWord />
      <VideoBlock />
      <Faq />
      <NewsLatter />

      <ReactSVG src={first} className={css.firstV} />
      <ReactSVG src={second} className={css.secondV} />
      <ReactSVG src={thre} className={css.threeV} />
      <ReactSVG src={fourV} className={css.threeV} />
      <ReactSVG src={fiveV} className={css.fiveV} />
      <ReactSVG src={sixV} className={css.sixV} />
      <ReactSVG src={sevenV} className={css.sevenV} />
      <ReactSVG src={eigthV} className={css.eigthV} />
      <ReactSVG src={nineV} className={css.nineV} />
      <ReactSVG src={tenV} className={css.tenV} />
      <ReactSVG src={newOne} className={css.newOne} />
      <ReactSVG src={newTwo} className={css.newTwo} />
      <ReactSVG src={newThre} className={css.newThre} />
      <ReactSVG src={newFour} className={css.newFour} />
      <ReactSVG src={newFive} className={css.newFive} />
      <ReactSVG src={newSix} className={css.newSix} />
      <ReactSVG src={newSeven} className={css.newSeven} />
      <ReactSVG src={newEight} className={css.newEight} />
      <ReactSVG src={newNine} className={css.newNine} />
      <ReactSVG src={newTen} className={css.newTen} />
    </div>
  );
};
export default SecondBlock;

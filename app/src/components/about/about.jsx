import NewsLatter from "../main/newsLatter";
import Footer from "../standartComponent/footer";
import Header from "../standartComponent/header";
import HeaderNormal from "../standartComponent/headerNormal";
import css from "./about.module.css";
import Approach from "./approach";
import FindProd from "./findProd";
import FirstBlock from "./firstBlock";
import SecondBlockAll from "./secondBlockAll";
import StandartC from "./standartC";
import Substainability from "./substainability";
const About = ({ totalQuantity, activeUser }) => {
  return (
    <>
      <Header totalQuantity={totalQuantity} activeUser={activeUser} />

      <FirstBlock />
      <div className={css.allMainWrap}>
        <SecondBlockAll />
        <FindProd />
        <Approach />
        <StandartC />
        <Substainability />
      </div>
      <NewsLatter />
      <Footer />
    </>
  );
};
export default About;

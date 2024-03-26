import Footer from "../standartComponent/footer";
import Header from "../standartComponent/header";
import FirstBlock from "./firstBlock";
import css from "./main.module.css";
import SecondBlock from "./secondBlock";
const Main = ({ activeUser }) => {
  return (
    <div className={css.allMainWrap}>
      <Header activeUser={activeUser} />
      <FirstBlock />
      <SecondBlock />
      <Footer />
    </div>
  );
};
export default Main;

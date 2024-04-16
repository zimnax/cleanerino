import Footer from "../standartComponent/footer";
import Header from "../standartComponent/header";
import FirstBlock from "./firstBlock";
import css from "./main.module.css";
import SecondBlock from "./secondBlock";
const Main = ({ activeUser, totalQuantity }) => {
  return (
    <div className={css.allMainWrap}>
      <Header activeUser={activeUser} totalQuantity={totalQuantity} />
      <FirstBlock />
      <SecondBlock />
      <Footer />
    </div>
  );
};
export default Main;

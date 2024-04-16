import HeaderDash from "../standartComponent/headerDash";
import css from "./cabinet.module.css";
import DashBoard from "./dashBoard";
const Cabinet = ({ activeUser, totalQuantity }) => {
  return (
    <>
      <HeaderDash activeUser={activeUser} totalQuantity={totalQuantity} />
      <DashBoard activeUser={activeUser} />
    </>
  );
};
export default Cabinet;

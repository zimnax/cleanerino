import HeaderModernWhiteCatalog from "../standartComponent/HeaderModernWhiteCatalog";
import HeaderDash from "../standartComponent/headerDash";
import css from "./cabinet.module.css";
import DashBoard from "./dashBoard";
const Cabinet = ({ activeUser, totalQuantity }) => {
  return (
    <>
      <HeaderModernWhiteCatalog
        activeUser={activeUser}
        totalQuantity={totalQuantity}
      />
      <DashBoard activeUser={activeUser} />
    </>
  );
};
export default Cabinet;

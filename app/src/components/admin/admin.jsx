import HeaderDash from "../standartComponent/headerDash";
import css from "./admin.module.css";
import DashBoard from "./dashBoard";
const Admin = ({ activeUser, totalQuantity }) => {
  return (
    <>
      <HeaderDash activeUser={activeUser} totalQuantity={totalQuantity} />
      <DashBoard activeUser={activeUser} />
    </>
  );
};
export default Admin;

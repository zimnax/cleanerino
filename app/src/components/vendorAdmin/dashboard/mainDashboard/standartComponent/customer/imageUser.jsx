import { useEffect, useState } from "react";
import withMySQLData from "../../../../../HOK/withMySQLData";
import css from "./orders.module.css";
const ImageUser = ({ data, id }) => {
  const [foundUser, setFoundUser] = useState(null);
  useEffect(() => {
    if (!data || !id) {
      return;
    }
    if (data && data.users) {
      const user = data.users.find((user) => user.id === id);
      setFoundUser(user);
    }
  }, [data, id]);
  console.log(foundUser);
  return (
    <>
      {foundUser && foundUser.photo && (
        <img className={css.imageStyleUser} src={foundUser.photo} alt="Photo" />
      )}
    </>
  );
};
export default withMySQLData(
  `${process.env.REACT_APP_API_URL}/api/v1/users/profile`
)(ImageUser);

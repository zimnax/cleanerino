import css from "../vendorProductSt.module.css";
const Certification = ({ users }) => {
  console.log("users", users);
  return (
    <div className={css.wrapPabAnfSet}>
      <p className={css.venDescTop}>Certifications</p>
      <div className={css.certWrapM}>
        {users &&
          users.certifications.map((el, index) => {
            return (
              <img
                key={index}
                src={el.image}
                className={css.certificationIcon}
                alt="certificat"
              />
            );
          })}
      </div>
    </div>
  );
};
export default Certification;

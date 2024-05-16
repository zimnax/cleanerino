import { useState } from "react";
import css from "./checkout.module.css";
const Shiping = ({
  users,
  calculateTax,
  selectedAddress,
  setSelectedAddress,
  address,
  setAddress,
}) => {
  const handleAddressClick = (index) => {
    setSelectedAddress(index);
    setAddress(users.addresses[index]);
    calculateTax(
      users.addresses[index].apartment + users.addresses[index].street,
      users.addresses[index].city,
      users.addresses[index].state,
      users.addresses[index].zip_code,
      "US"
    );
    setAddress({
      name: users.user_name,
      street1: `${users.addresses[index].apartment} ${users.addresses[index].street}`,
      city: users.addresses[index].city,
      state: users.addresses[index].state,
      zip: users.addresses[index].zip_code,
      country: "US",
      phone: users.phone,
      email: users.email,
      id: users.id,
    });
  };

  return (
    <div className={css.shipingWrapAll}>
      <p className={css.savedAddressesP}>Saved Addresses</p>
      <div className={css.wrapAddressesList}>
        {users &&
          users.addresses.map((user, index) => (
            <div
              className={`${
                selectedAddress === index
                  ? css.wrapOneAddressTrue
                  : css.wrapOneAddress
              }`}
              key={index}
              onClick={() => handleAddressClick(index)}
            >
              <div className={css.wrapButtonWithC}>
                <p
                  className={`${
                    selectedAddress === index
                      ? css.nameInAddressTrue
                      : css.nameInAddress
                  }`}
                >
                  {users.user_name}
                </p>
                {selectedAddress === index && (
                  <div className={css.circNoneTrue}>
                    <div className={css.smalCircutL}></div>
                  </div>
                )}
                {selectedAddress !== index && (
                  <div className={css.circNone}></div>
                )}
              </div>
              <p className={css.allAdressInOne}>
                {user.apartment}, {user.street}, {user.city}, {user.state},{" "}
                {user.zip_code}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Shiping;

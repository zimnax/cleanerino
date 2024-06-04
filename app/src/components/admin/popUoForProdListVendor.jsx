import React from "react";
import css from "./admin.module.css";

const PopUoForProdListVendor = ({
  vendor,
  onClose,
  style,
  updateOrderStatusLabel,
}) => {
  return (
    <div className={css.wrapPopUp} style={style}>
      <div className={css.wrapTextPopUp}>Edit</div>
      <div
        className={css.wrapTextPopUp}
        onClick={() => updateOrderStatusLabel(vendor.id, "waiting")}
      >
        Approval pending
      </div>
      <div
        className={css.wrapTextPopUp}
        onClick={() => updateOrderStatusLabel(vendor.id, "listed")}
      >
        Listed
      </div>
      <div
        className={css.wrapTextPopUpDeactive}
        onClick={() => updateOrderStatusLabel(vendor.id, "notaccepted")}
      >
        Not accepted
      </div>
    </div>
  );
};

export default PopUoForProdListVendor;

import React from "react";
// import css from "../productList/productList.module.css";
import css from "./product.module.css";
import { useNavigate } from "react-router-dom";
const PopUoForProdListVendor = ({
  vendor,
  onClose,

  updateOrderStatusLabel,
}) => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapPopUpProd}>
      <div
        className={css.wrapTextPopUp}
        onClick={() => updateOrderStatusLabel(vendor.id, "waiting")}
      >
        Approval pending
      </div>
      <div
        className={css.wrapTextPopUpApp}
        onClick={() => updateOrderStatusLabel(vendor.id, "listed")}
      >
        Approve
      </div>
      <div
        className={css.wrapTextPopUpDeactiveNew}
        onClick={() => updateOrderStatusLabel(vendor.id, "notaccepted")}
      >
        Decline
      </div>
    </div>
  );
};

export default PopUoForProdListVendor;

import React from "react";
import css from "./admin.module.css";
import { useNavigate } from "react-router-dom";
const PopUpInVend = ({ vendor, onClose, style, updateOrderStatusLabel }) => {
  const navigate = useNavigate();
  return (
    <div className={css.wrapPopUp} style={style}>
      <div
        className={css.wrapTextPopUp}
        onClick={() => navigate(`/admin/vendors/profile/${vendor.id}`)}
      >
        Edit
      </div>
      <div
        className={css.wrapTextPopUp}
        onClick={() => updateOrderStatusLabel(vendor.id, "paused")}
      >
        Put on hold
      </div>
      <div
        className={css.wrapTextPopUp}
        onClick={() => updateOrderStatusLabel(vendor.id, "active")}
      >
        Activate
      </div>
      <div
        className={css.wrapTextPopUpDeactive}
        onClick={() => updateOrderStatusLabel(vendor.id, "deactivated")}
      >
        Deactivate
      </div>
    </div>
  );
};

export default PopUpInVend;

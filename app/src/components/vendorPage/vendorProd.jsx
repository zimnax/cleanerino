import LeftPanel from "./leftPanel";
import RightPanel from "./rightPanel";
import css from "./vendor.module.css";

const VendorProd = () => {
  return (
    <div className={css.wrapFilterWithProd}>
      <LeftPanel />
      <RightPanel />
    </div>
  );
};
export default VendorProd;

import ProductSmall from "../vendorPage/productSmall";
import css from "./product.module.css";

const AlsoLike = () => {
  return (
    <div className={css.wrapFirstBlock}>
      <div className={css.smallWrapTr}>
        <p className={css.pAlsoLike}>You Might Also Like</p>
        <div className={css.wrapProdAlso}>
          <ProductSmall />
          <ProductSmall />
          <ProductSmall />
        </div>
      </div>
    </div>
  );
};
export default AlsoLike;

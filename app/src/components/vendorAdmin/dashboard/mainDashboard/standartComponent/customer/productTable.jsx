import React from "react";
import css from "./orders.module.css";
import OneOrderProduct from "./oneOrderProduct";
const ProductTable = ({ prodOrder, timeData }) => {
  return (
    <table className={css.table}>
      <thead>
        <tr className={css.mainTr}>
          <th className={css.thClass}>Item name</th>
          <th className={css.thClass}>Date</th>
          <th className={css.thClass}>Price</th>
          <th className={css.thClass}>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {prodOrder.map((product, i) => {
          const dateObj = new Date(product.date);
          const day = dateObj.getDate().toString().padStart(2, "0");
          const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
          const year = dateObj.getFullYear().toString().slice(-2);
          const formattedDate = `${day}.${month}.${year}`;

          return (
            <OneOrderProduct
              product={product}
              key={i}
              formattedDate={formattedDate}
              timeData={timeData}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default ProductTable;

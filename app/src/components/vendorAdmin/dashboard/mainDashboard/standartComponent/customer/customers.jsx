import { useEffect, useState } from "react";
import css from "./orders.module.css";
import axios from "axios";
import ImageUser from "./imageUser";
import ProductTable from "./productTable";
import { ReactSVG } from "react-svg";
import arrowDown from "../../../../../../svg/downArrowCustomers.svg";
import arrowUp from "../../../../../../svg/aroowUpInCustomersP.svg";
const Customers = ({ users }) => {
  const [orders, setOrders] = useState([]);
  const [showProductTable, setShowProductTable] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [prodOrder, setProdOrder] = useState(null);
  const [timeData, setTimeData] = useState(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/orders/${users.id}`
        );
        const ordersData = response.data;

        const ordersWithTotalPriceAndQuantity = ordersData.map((order) => {
          // Порахувати загальну вартість та кількість товарів для кожного замовлення
          const totalPrice = order.products.reduce(
            (acc, product) =>
              acc + parseFloat(product.price) * product.quantity,
            0
          );
          const totalQuantity = order.products.reduce(
            (acc, product) => acc + product.quantity,
            0
          );

          // Повернути об'єкт замовлення з доданими параметрами загальної вартості та кількості товарів
          return {
            ...order,
            totalPrice,
            totalQuantity,
          };
        });

        setOrders(ordersWithTotalPriceAndQuantity);
      } catch (error) {
        console.error("Помилка при отриманні замовлень:", error);
      }
    };

    fetchOrders();
  }, [users]);
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/orders/${orderId}`,
        { order_status: newStatus }
      );
      // Оновлення стану компоненти після успішного оновлення статусу
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, order_status: newStatus } : order
      );
      setOrders(updatedOrders);
    } catch (error) {
      console.error("Помилка при оновленні статусу замовлення:", error);
    }
  };

  const toggleProductTable = (index, products, formattedDate) => {
    setProdOrder(products);
    setShowProductTable(selectedIndex !== index || !showProductTable);
    setSelectedIndex(selectedIndex !== index ? index : null);
    setTimeData(formattedDate);
  };

  return (
    <div className={css.allOrdersInVendor}>
      <div className={css.wrapProdTable}>
        <div className={css.allForDashProductWrap}>
          <table className={css.table}>
            <thead>
              <tr className={css.mainTr}>
                <th className={css.thClass}>Customer</th>
                <th className={css.thClass}>User ID</th>
                <th className={css.thClass}>Date</th>
                <th className={css.thClass}>Order total</th>
                <th className={css.thClass}></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.map((el, index) => {
                  const dateObj = new Date(el.date);
                  const day = dateObj.getDate().toString().padStart(2, "0");
                  const month = (dateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = dateObj.getFullYear().toString().slice(-2);
                  const formattedDate = `${month}.${day}.${year}`;

                  return (
                    <>
                      <div
                        className={
                          selectedIndex === index
                            ? css.wrapWithIndex
                            : css.wrapAllTr
                        }
                        key={index}
                      >
                        <tr className={css.secondTr}>
                          <td className={css.tdClassProd}>
                            {el.id && <ImageUser id={el.id} />}
                            {el.name}
                          </td>
                          <td className={css.tdClassProd}>{el.id}</td>
                          <td className={css.tdClassProd}>{formattedDate}</td>

                          <td className={css.tdClassProd}>{el.totalPrice}</td>
                          <td className={css.tdClassProd}>
                            {selectedIndex === index && (
                              <ReactSVG
                                src={arrowUp}
                                className={css.arrowDown}
                                onClick={() =>
                                  toggleProductTable(index, el.products)
                                }
                              />
                            )}
                            {selectedIndex !== index && (
                              <ReactSVG
                                src={arrowDown}
                                className={css.arrowDown}
                                onClick={() =>
                                  toggleProductTable(
                                    index,
                                    el.products,
                                    formattedDate
                                  )
                                }
                              />
                            )}
                          </td>
                        </tr>
                        <div className={css.lineInCustomers}></div>
                        {showProductTable && selectedIndex === index && (
                          <div className={css.wrapProdIn}>
                            <ProductTable
                              prodOrder={prodOrder}
                              timeData={timeData}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Customers;

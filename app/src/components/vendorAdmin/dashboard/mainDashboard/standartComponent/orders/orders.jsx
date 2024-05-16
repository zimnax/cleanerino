import { useEffect, useState } from "react";
import css from "./orders.module.css";
import axios from "axios";
import { Circles } from "react-loader-spinner";
const Orders = ({ users }) => {
  const [orders, setOrders] = useState([]);
  const [all, setAll] = useState(true);
  const [newOne, setNewOne] = useState(false);
  const [procesing, setProcesing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [returns, setReturns] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleItemClick = (setter) => {
    setAll(false);
    setNewOne(false);
    setProcesing(false);
    setCompleted(false);
    setReturns(false);

    setter(true);
  };
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
        const sortedOrders = ordersWithTotalPriceAndQuantity.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Помилка при отриманні замовлень:", error);
      }
    };

    fetchOrders();
  }, [users]);

  // Функція для відфільтрування та сортування замовлень
  const filterAndSortOrders = (status) => {
    // Відфільтровуємо замовлення за вказаним статусом
    const filteredOrders = orders.filter(
      (order) => order.order_status === status
    );
    // Сортуємо відфільтровані замовлення за датою у зворотньому порядку
    const sortedOrders = filteredOrders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    // Встановлюємо відфільтровані та відсортовані замовлення в стан
    setFilteredOrders(sortedOrders);
  };

  // Викликаємо функцію для фільтрації та сортування замовлень при зміні стану all, newOne, procesing, completed або returns
  useEffect(() => {
    if (all) {
      // Якщо вибрано всі замовлення, сортуємо усі замовлення
      const sortedOrders = orders.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setFilteredOrders(sortedOrders);
    } else if (newOne) {
      // Якщо вибрано нові замовлення, викликаємо функцію для фільтрації та сортування нових замовлень
      filterAndSortOrders("New");
    } else if (procesing) {
      // Та само для замовлень в обробці
      filterAndSortOrders("Processing");
    } else if (completed) {
      // Та само для завершених замовлень
      filterAndSortOrders("Completed");
    } else if (returns) {
      // Та само для повернених замовлень
      filterAndSortOrders("Returns");
    }
  }, [all, newOne, procesing, completed, returns, orders]);
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
  const updateOrderStatusLabel = async (orderId, newStatus, label) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/orders/${orderId}`,
        { order_status: newStatus, ship_info: label }
      );
      // Оновлення стану компоненти після успішного оновлення статусу
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, order_status: newStatus } : order
      );
      console.log("label", label);
      setOrders(updatedOrders);
      window.open(label, "_blank");
    } catch (error) {
      console.error("Помилка при оновленні статусу замовлення:", error);
    }
  };
  const handleShipOrder = async (orderId, proces, shipInfo) => {
    setLoading(true);
    const labelUrl = await createLabel(shipInfo);
    if (labelUrl) {
      // Якщо етикетка успішно створена, викликаємо updateOrderStatus для оновлення статусу замовлення
      updateOrderStatusLabel(orderId, "Processing", labelUrl);
      setLoading(false);
    } else {
      setLoading(false);
      console.error("Не вдалося створити етикетку.");
    }
  };

  const createLabel = async (shipmentId) => {
    try {
      const response = await axios.post(
        "https://api.goshippo.com/transactions/",
        {
          rate: shipmentId,
          async: false,
        },
        {
          headers: {
            Authorization: `ShippoToken ${process.env.REACT_APP_SHIPO_TOKEN_API}`,
            "Content-Type": "application/json",
          },
        }
      );
      const labelUrl = response.data.label_url;

      return labelUrl;
    } catch (error) {
      console.error("Error creating label:", error);
      return null;
    }
  };
  return (
    <div className={css.allOrdersInVendor}>
      <div className={css.wrapProdTable}>
        <p className={css.orderPinVendorD}>Orders</p>
        <div className={css.allForDashProductWrap}>
          <div className={css.wrapAllProcProd}>
            <ul className={css.profileUl}>
              <li
                className={
                  all
                    ? `${css.profileLi} ${css.profileLiActive}`
                    : css.profileLi
                }
                onClick={() => handleItemClick(setAll)}
              >
                All
              </li>
              <li
                className={
                  newOne
                    ? `${css.profileLi} ${css.profileLiActive}`
                    : css.profileLi
                }
                onClick={() => handleItemClick(setNewOne)}
              >
                New
              </li>
              <li
                className={
                  procesing
                    ? `${css.profileLi} ${css.profileLiActive}`
                    : css.profileLi
                }
                onClick={() => handleItemClick(setProcesing)}
              >
                Processing
              </li>
              <li
                className={
                  completed
                    ? `${css.profileLi} ${css.profileLiActive}`
                    : css.profileLi
                }
                onClick={() => handleItemClick(setCompleted)}
              >
                Completed
              </li>
              <li
                className={
                  returns
                    ? `${css.profileLi} ${css.profileLiActive}`
                    : css.profileLi
                }
                onClick={() => handleItemClick(setReturns)}
              >
                Returns
              </li>
            </ul>
          </div>
          <table className={css.table}>
            <thead>
              <tr className={css.mainTr}>
                <th className={css.thClass}>Date</th>

                <th className={css.thClass}>Name</th>
                <th className={css.thClass}>Quantity</th>
                <th className={css.thClass}>Shipping address</th>
                <th className={css.thClass}>Shipping total</th>
                <th className={css.thClass}>Order total</th>
                <th className={css.thClass}>Taxes</th>
                <th className={css.thClass}>Status</th>
                <th className={css.thClass}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders &&
                filteredOrders.map((el, index) => {
                  const dateObj = new Date(el.date);
                  const day = dateObj.getDate().toString().padStart(2, "0");
                  const month = (dateObj.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = dateObj.getFullYear().toString().slice(-2);
                  const formattedDate = `${month}.${day}.${year}`;
                  return (
                    <>
                      <tr className={css.secondTr} key={index}>
                        <td className={css.tdClassProd}>{formattedDate}</td>
                        <td className={css.tdClassProd}>{el.name}</td>
                        <td className={css.tdClassProd}>{el.totalQuantity}</td>
                        <td className={css.tdClassProd}>{el.address}</td>
                        <td className={css.tdClassProd}>{el.shipping_total}</td>
                        <td className={css.tdClassProd}>{el.totalPrice}</td>
                        <td className={css.tdClassProd}>{el.fees}</td>
                        <td className={css.tdClassProd}>
                          {el.order_status === "New" && (
                            <div className={css.statusOrderNew}>
                              {el.order_status}
                            </div>
                          )}
                          {el.order_status === "Processing" && (
                            <div className={css.statusOrderProcessing}>
                              {el.order_status}
                            </div>
                          )}
                          {el.order_status === "Completed" && (
                            <div className={css.statusOrderCompleated}>
                              {el.order_status}
                            </div>
                          )}
                        </td>
                        <td className={css.tdClassProd}>
                          {el.order_status === "New" && (
                            <div
                              className={css.shipOrA}
                              onClick={() =>
                                handleShipOrder(
                                  el.id,
                                  "Processing",
                                  el.ship_info
                                )
                              }
                            >
                              Ship
                            </div>
                          )}
                          {el.order_status === "Processing" && (
                            <div
                              className={css.shipOrA}
                              onClick={() =>
                                updateOrderStatus(el.id, "Completed")
                              }
                            >
                              Сomplete
                            </div>
                          )}
                          {el.order_status === "Completed" && <div></div>}
                        </td>
                      </tr>
                      <div className={css.lineInCustomers}></div>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
      {loading && (
        <div className={css.spinerWrap}>
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};
export default Orders;

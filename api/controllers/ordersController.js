const db = require("../config/database.js");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
exports.createOrder = (req, res) => {
  const {
    name,
    quantity,
    address,
    shipping_total,
    order_total,
    fees,
    order_status,
    payment_status,
    user_name,
    user_id,
    sesion_id,
    vendorId,
    phone,
    email,
    ship_info,
  } = req.body;

  // console.log("In Order", req.body);

  db.query(
    "INSERT INTO orders (name, quantity, address, shipping_total, order_total, fees, order_status, payment_status, user_name, user_id, sesion_id, vendorId, phone, email, ship_info) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      quantity,
      address,
      shipping_total,
      order_total,
      fees,
      order_status,
      payment_status,
      user_name,
      user_id,
      sesion_id,
      vendorId,
      phone,
      email,
      ship_info,
    ],
    (err, result) => {
      if (err) {
        console.error("Error creating order:", err);
        return res.status(500).json({ message: "Failed to create order" });
      }

      const orderId = result.insertId;
      const requests = [];

      for (const product of req.body.products) {
        const { id, quantity, price } = product;
        const orderData = {
          product_id: id,
          quantity,
          price,
          order_id: orderId,
        };

        axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/orders/product`,
          orderData,
          (error, response) => {
            if (error) {
              console.error("Error sending request:", error);
            } else {
              requests.push(response.data);
            }
          }
        );
      }

      res.status(200).json({
        message: "Order created successfully",
        order: { id: orderId, ...req.body },
      });
    }
  );
};
// exports.getOrder = (req, res) => {
//   const orderId = req.params.orderId; // Отримуємо id замовлення з URL

//   // Запит до бази даних, який вибирає замовлення та пов'язані з ним товари
//   const query = `
//     SELECT orders.*, product_order.product_id, product_order.quantity AS product_quantity, product_order.price AS product_price
//     FROM orders
//     LEFT JOIN product_order ON orders.id = product_order.order_id
//     WHERE orders.id = ?
//   `;

//   db.query(query, [orderId], (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні замовлення:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Замовлення не знайдено" });
//     }

//     // Формуємо об'єкт відповіді, який містить замовлення та його товари
//     const order = {
//       id: result[0].id,
//       name: result[0].name,
//       quantity: result[0].quantity,
//       address: result[0].address,
//       // Додайте інші поля замовлення, які вам потрібні
//       products: result.map((row) => ({
//         product_id: row.product_id,
//         quantity: row.product_quantity,
//         price: row.product_price,
//       })),
//     };

//     res.status(200).json(order);
//   });
// };
exports.getOrdersByVendorId = (req, res) => {
  const vendorId = req.params.id; // Отримуємо id постачальника з URL

  // Запит до бази даних, який вибирає всі замовлення в яких vendorId === переданому id
  const query = `
    SELECT orders.id, orders.date, orders.name, orders.quantity, orders.address, orders.shipping_total, orders.order_total, orders.fees, orders.order_status, orders.payment_status, orders.user_name, orders.user_id, orders.sesion_id, orders.vendorId, orders.phone, orders.email, orders.ship_info,
    product_order.product_id, product_order.quantity AS product_quantity, product_order.price AS product_price
    FROM orders
    LEFT JOIN product_order ON orders.id = product_order.order_id
    WHERE orders.vendorId = ?
  `;

  db.query(query, [vendorId], (err, result) => {
    if (err) {
      console.error("Помилка при отриманні замовлень:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "Замовлення для цього постачальника не знайдено" });
    }

    // Об'єкт для зберігання замовлень
    const ordersMap = new Map();

    // Перебираємо кожен рядок результату запиту
    result.forEach((row) => {
      // Перевіряємо, чи маємо вже це замовлення в мапі
      if (!ordersMap.has(row.id)) {
        // Якщо ні, додаємо новий запис для цього замовлення
        ordersMap.set(row.id, {
          id: row.id,
          date: row.date,
          name: row.name,
          quantity: row.quantity,
          address: row.address,
          shipping_total: row.shipping_total,
          order_total: row.order_total,
          fees: row.fees,
          order_status: row.order_status,
          payment_status: row.payment_status,
          user_name: row.user_name,
          user_id: row.user_id,
          sesion_id: row.sesion_id,
          vendorId: row.vendorId,
          phone: row.phone,
          email: row.email,
          ship_info: row.ship_info,
          // Створюємо масив для товарів цього замовлення
          products: [],
        });
      }

      // Додаємо товар до масиву товарів для цього замовлення
      ordersMap.get(row.id).products.push({
        product_id: row.product_id,
        quantity: row.product_quantity,
        price: row.product_price,
      });
    });

    // Перетворюємо мапу на масив об'єктів замовлень
    const orders = Array.from(ordersMap.values());

    res.status(200).json(orders);
  });
};
// exports.getOrdersByVendorId = (req, res) => {
//   const vendorId = req.params.id; // Отримуємо id постачальника з URL

//   // Запит до бази даних, який вибирає всі замовлення в яких vendorId === переданому id
//   const query = `
//     SELECT orders.id, orders.date, orders.name, orders.quantity, orders.address, orders.shipping_total, orders.order_total, orders.fees, orders.order_status, orders.payment_status, orders.user_name, orders.user_id, orders.sesion_id, orders.vendorId, orders.phone, orders.email, orders.ship_info,
//     product_order.product_id, product_order.quantity AS product_quantity, product_order.price AS product_price
//     FROM orders
//     LEFT JOIN product_order ON orders.id = product_order.order_id
//     WHERE orders.vendorId = ?
//   `;

//   db.query(query, [vendorId], (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні замовлень:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     if (result.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "Замовлення для цього постачальника не знайдено" });
//     }

//     // Формуємо масив замовлень
//     const orders = result.map((row) => ({
//       id: row.id,
//       date: row.date,
//       name: row.name,
//       quantity: row.quantity,
//       address: row.address,
//       shipping_total: row.shipping_total,
//       order_total: row.order_total,
//       fees: row.fees,
//       order_status: row.order_status,
//       payment_status: row.payment_status,
//       user_name: row.user_name,
//       user_id: row.user_id,
//       sesion_id: row.sesion_id,
//       vendorId: row.vendorId,
//       phone: row.phone,
//       email: row.email,
//       ship_info: row.ship_info,
//       // Додайте інші поля замовлення, які вам потрібні
//       products: {
//         product_id: row.product_id,
//         quantity: row.product_quantity,
//         price: row.product_price,
//       },
//     }));

//     res.status(200).json(orders);
//   });
// };
exports.getAllOrders = (req, res) => {
  // Запит до бази даних, який вибирає всі замовлення та їх пов'язані товари
  const query = `
    SELECT orders.*, GROUP_CONCAT(product_order.product_id) AS product_ids, GROUP_CONCAT(product_order.quantity) AS product_quantities, GROUP_CONCAT(product_order.price) AS product_prices
    FROM orders
    LEFT JOIN product_order ON orders.id = product_order.order_id
    GROUP BY orders.id
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні замовлень:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перетворюємо результат запиту в масив замовлень
    const orders = result.map((row) => ({
      id: row.id,
      name: row.name,
      quantity: row.quantity,
      address: row.address,
      // Додайте інші поля замовлення, які вам потрібні
      products: row.product_ids
        ? row.product_ids.split(",").map((id, index) => ({
            product_id: parseInt(id),
            quantity: parseInt(row.product_quantities.split(",")[index]),
            price: parseFloat(row.product_prices.split(",")[index]),
          }))
        : [],
    }));

    res.status(200).json(orders);
  });
};
exports.updateOrderById = (req, res) => {
  const orderId = req.params.id; // Отримуємо id замовлення з URL
  const updatedData = req.body; // Отримуємо дані для оновлення замовлення з тіла запиту

  // Побудова SQL-запиту для оновлення замовлення
  const updateQuery = `
    UPDATE orders
    SET ${Object.keys(updatedData)
      .map((key) => `${key} = ?`)
      .join(", ")}
    WHERE id = ?
  `;

  // Параметри для SQL-запиту (значення для оновлення та ID замовлення)
  const queryParams = [...Object.values(updatedData), orderId];

  // Виконання SQL-запиту
  db.query(updateQuery, queryParams, (err, result) => {
    if (err) {
      console.error("Помилка при оновленні замовлення:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перевірка чи було здійснене оновлення
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Замовлення не знайдено" });
    }

    // Відправка відповіді про успішне оновлення
    res.status(200).json({ message: "Замовлення оновлено успішно" });
  });
};

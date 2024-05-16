const db = require("../config/database.js");

exports.createOrderProduct = (req, res) => {
  const { product_id, quantity, price, order_id } = req.body;

  db.query(
    "INSERT INTO product_order (product_id, quantity, price, order_id) VALUES (?, ?, ?, ?)",
    [product_id, quantity, price, order_id],
    (err, result) => {
      if (err) {
        console.error("Error creating product order:", err);
        return res
          .status(500)
          .json({ message: "Failed to create product order" });
      }

      // Отримання ідентифікатора вставленого рядка
      const insertedId = result.insertId;

      // Відправлення відповіді з інформацією про створений продукт
      res.status(200).json({
        message: "Product order created successfully",
        productOrder: { id: insertedId, ...req.body },
      });
    }
  );
};

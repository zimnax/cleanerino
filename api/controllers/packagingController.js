const db = require("../config/database.js");

exports.getAllPackaging = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = "SELECT * FROM packaging_subcategories";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні деталей:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    return res.status(200).json(result);
  });
};

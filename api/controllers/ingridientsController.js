const db = require("../config/database.js");

exports.getAllIngridient = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = "SELECT * FROM ingridients";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні деталей:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    return res.status(200).json(result);
  });
};
exports.getAllIngridientsIcon = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = "SELECT * FROM ingridient_icon";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні деталей:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    return res.status(200).json(result);
  });
};

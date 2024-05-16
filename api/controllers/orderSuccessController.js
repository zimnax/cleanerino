const db = require("../config/database.js");
exports.successOrder = (req, res) => {
  const eventType = req.body.type;

  // Перевірка, чи це подія checkout.session.completed
  if (eventType === "checkout.session.completed") {
    const sessionId = req.body.data.object.id;
    console.log("Session ID:", sessionId);
    const updateQuery = `
      UPDATE orders 
      SET payment_status = 'paid' 
      WHERE sesion_id = ?;
    `;
    db.query(updateQuery, [sessionId], (err, result) => {
      if (err) {
        console.error("Помилка при оновленні статусу оплати:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      console.log("Статуси оплати оновлені успішно");
      return res
        .status(200)
        .json({ message: "Статуси оплати оновлені успішно" });
    });
    // Тут ви можете додати будь-яку додаткову логіку або обробку для успішного платежу
  } else {
    // Якщо це не checkout.session.completed, можливо, вам потрібно опрацювати інші типи подій
    console.log("Інша подія:", eventType);
  }
};

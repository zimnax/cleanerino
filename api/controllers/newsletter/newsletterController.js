const db = require("../../config/database.js");
exports.createNews = (req, res) => {
  const { email } = req.body; // Отримання email з тіла запиту

  // Перевірка, чи не пустий email
  if (!email) {
    return res.status(400).json({ message: "Email cannot be empty." });
  }

  // Перевірка, чи існує вже такий email у базі даних
  db.query(`SELECT * FROM emails WHERE email='${email}'`, (error, results) => {
    if (error) {
      console.error("Помилка при виконанні запиту до бази даних:", error);
      return res
        .status(500)
        .json({ message: "Помилка сервера при перевірці наявності email." });
    }

    // Якщо знайдено email, повертаємо помилку
    if (results.length > 0) {
      return res.status(201).json({ message: "This email already exists." });
    }

    // Додавання нового email до бази даних
    db.query(`INSERT INTO emails (email) VALUES ('${email}')`, (error) => {
      if (error) {
        console.error("Помилка при виконанні запиту до бази даних:", error);
        return res
          .status(500)
          .json({ message: "Помилка сервера при додаванні email." });
      }

      // Відправка успішної відповіді
      return res.status(200).json({ message: "Email successfully added." });
    });
  });
};

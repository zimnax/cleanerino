// // Import library
// const mysql = require("mysql2");
// // create a new MySQL connection
// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "147852369",
//   database: "cleanerino",
// });
// // connect to the MySQL database
// db.connect((error) => {
//   if (error) {
//     console.error("Error connecting to MySQL database:", error);
//   } else {
//     console.log("Connected to MySQL database!");
//   }
// });
// // close the MySQL connection

// module.exports = db;
const mysql = require("mysql2");

// Створення пулу з'єднань
const db = mysql.createPool({
  connectionLimit: 10, // Максимальна кількість з'єднань в пулі
  host: "localhost",
  user: "root",
  password: "147852369",
  database: "cleanerino",
});

// Відкриваємо з'єднання з базою даних з пулу
db.getConnection((err, connection) => {
  if (err) {
    console.error("Помилка під час встановлення з'єднання:", err);
    return;
  }

  console.log("Connected to MySQL database!");

  // Ваші контролери тут

  // Повертаємо з'єднання назад до пулу після виконання операцій з базою даних
  connection.release();
});

module.exports = db;

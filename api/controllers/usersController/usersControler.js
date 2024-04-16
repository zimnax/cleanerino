const db = require("../../config/database.js");
const { Readable } = require("stream"); // Імпорт модуля stream
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const axios = require("axios");
const { Buffer } = require("buffer");

const fs = require("fs");
const _ = require("lodash");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("../../function/firebase.js");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const multer = require("multer");

// exports.getAllUsers = (req, res) => {
//   // Запит до бази даних на отримання всіх користувачів
//   const query = `SELECT * FROM users`;

//   db.query(query, (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні користувачів:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     // Якщо дані успішно отримані з бази даних
//     return res.status(200).json({ status: "success", users: result });
//   });
// };
exports.getAllUsers = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів з їх адресами
  const query = `
    SELECT 
      u.id, 
      u.user_name, 
      u.email, 
      u.phone, 
      u.country, 
      u.state, 
      u.city, 
      u.street, 
      u.zip, 
      u.firebaseId, 
      u.photo, 
      u.news, 
      u.created_at, 
      ua.id AS address_id, 
      ua.street AS address_street, 
      ua.apartment, 
      ua.city AS address_city, 
      ua.state AS address_state, 
      ua.zip_code AS address_zip_code
    FROM users u
    LEFT JOIN users_address ua ON u.id = ua.user_id
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні користувачів з адресами:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Об'єкт для зберігання користувачів і їх адрес
    const usersWithAddresses = {};

    // Обробка кожного рядка результату
    result.forEach((row) => {
      const userId = row.id;

      // Перевірка, чи користувач вже присутній в об'єкті
      if (!usersWithAddresses[userId]) {
        // Якщо ні, додати користувача до об'єкту з адресою
        usersWithAddresses[userId] = {
          id: row.id,
          user_name: row.user_name,
          email: row.email,
          phone: row.phone,
          news: row.news,
          country: row.country,
          state: row.state,
          city: row.city,
          street: row.street,
          zip: row.zip,
          firebaseId: row.firebaseId,
          photo: row.photo,
          created_at: row.created_at,
          addresses: [],
        };
      }

      // Додавання адреси до користувача
      if (row.address_id) {
        usersWithAddresses[userId].addresses.push({
          address_id: row.address_id,
          street: row.address_street,
          apartment: row.apartment,
          city: row.address_city,
          state: row.address_state,
          zip_code: row.address_zip_code,
        });
      }
    });

    // Конвертація об'єкта користувачів у масив
    const usersArray = Object.values(usersWithAddresses);

    // Відправлення результату у відповідь на запит
    return res.status(200).json({ status: "success", users: usersArray });
  });
};
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  // Перевірка, чи був наданий ідентифікатор користувача
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Не вказаний ідентифікатор користувача" });
  }

  // Запит до бази даних на отримання користувача за його ідентифікатором
  const query = "SELECT * FROM vendors WHERE id=?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Помилка при отриманні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перевірка, чи користувач знайдений
    if (result.length === 0) {
      return res.status(404).json({ message: "Користувач не знайдений" });
    }

    // Якщо користувач успішно знайдений
    return res.status(200).json(result[0]);
  });
};

exports.createUser = (req, res) => {
  const { user_name, email, firebaseId } = req.body;

  // Перевірка, чи всі обов'язкові дані були надіслані
  if (!user_name || !email || !firebaseId) {
    return res.status(400).json({ message: "Не вистачає обов'язкових даних" });
  }

  // Запит до бази даних на додавання нового користувача
  const query = `INSERT INTO users (user_name, email, firebaseId) VALUES (?, ?, ?)`;
  db.query(query, [user_name, email, firebaseId], (err, result) => {
    if (err) {
      console.error("Помилка при створенні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо запис успішно додано до бази даних
    return res
      .status(200)
      .json({ status: "success", message: "Користувач успішно створений" });
  });
};
exports.updateUserMain = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  // Вибір полів, які не є null або undefined
  const validFields = _.pickBy(fieldsToUpdate, _.identity);

  // Перевірка, чи є щось оновлювати
  if (_.isEmpty(validFields)) {
    return res.status(400).json({ message: "Немає даних для оновлення" });
  }

  // Підготовка SQL-запиту
  let updateQuery = `UPDATE users SET `;
  const values = [];

  _.forEach(validFields, (value, key) => {
    if (value !== undefined && value !== null) {
      updateQuery += `${key} = ?, `;
      values.push(value);
    }
  });

  // Видалення останнього коми та пробілу
  updateQuery = updateQuery.slice(0, -2);

  // Додавання умови WHERE для певного користувача
  updateQuery += ` WHERE id = ?`;
  values.push(id);

  // Виконання запиту до бази даних
  db.query(updateQuery, values, (err, result) => {
    if (err) {
      console.error("Помилка при оновленні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }
    return res.status(200).json({ message: "Користувач оновлений успішно" });
  });
};
exports.getUserById = (req, res) => {
  const userId = req.params.id;

  // Перевірка, чи був наданий ідентифікатор користувача
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Не вказаний ідентифікатор користувача" });
  }

  // Запит до бази даних на отримання користувача за його ідентифікатором
  const query = "SELECT * FROM users WHERE id=?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Помилка при отриманні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перевірка, чи користувач знайдений
    if (result.length === 0) {
      return res.status(404).json({ message: "Користувач не знайдений" });
    }

    // Якщо користувач успішно знайдений
    return res.status(200).json(result[0]);
  });
};

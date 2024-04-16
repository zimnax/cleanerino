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

exports.getAllUsers = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = `SELECT * FROM users_address`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні користувачів:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо дані успішно отримані з бази даних
    return res.status(200).json({ status: "success", users: result });
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
  const { user_id, street, apartment, city, state, zip_code } = req.body;

  // Перевірка, чи всі обов'язкові дані були надіслані
  if (!user_id || !street || !city || !state || !zip_code) {
    return res.status(400).json({ message: "Не вистачає обов'язкових даних" });
  }

  // Якщо apartment не передано, присвоїти йому значення null
  const finalApartment = apartment || null;

  // Запит до бази даних на додавання нового користувача
  const query = `INSERT INTO users_address (user_id, street, apartment, city, state, zip_code) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [user_id, street, finalApartment, city, state, zip_code],
    (err, result) => {
      if (err) {
        console.error("Помилка при створенні користувача:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      // Якщо запис успішно додано до бази даних
      return res
        .status(200)
        .json({ status: "success", message: "Користувач успішно створений" });
    }
  );
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
  let updateQuery = `UPDATE users_address SET `;
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

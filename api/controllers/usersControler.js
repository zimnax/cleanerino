const db = require("../config/database.js");
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
const { app } = require("../function/firebase.js");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);
const multer = require("multer");
admin.initializeApp();

const upload = multer({ dest: "uploads/" });
exports.getAllBrand = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = "SELECT * FROM my_brand_is";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні деталей:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    return res.status(200).json(result);
  });
};
exports.getAllPayout = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів
  const query = "SELECT * FROM payout_d";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні деталей:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    return res.status(200).json(result);
  });
};

exports.getAllUsers = (req, res) => {
  // Запит до бази даних на отримання всіх користувачів з назвою бренду та деталями виплат
  const queryUsers = `
    SELECT 
        v.*, 
        b.name AS my_brand_name, 
        p.name AS payout_name
    FROM 
        vendors v
    LEFT JOIN 
        my_brand_is b ON v.my_brand_id = b.id
    LEFT JOIN 
        payout_d p ON v.payout_details_id = p.id
  `;

  db.query(queryUsers, (err, usersResult) => {
    if (err) {
      console.error("Помилка при отриманні користувачів:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувачі успішно отримані з бази даних
    const userIds = usersResult.map((user) => user.id);

    if (userIds.length === 0) {
      return res.status(200).json(usersResult);
    }

    // Запит на отримання сертифікацій для всіх користувачів
    const queryCertifications = `
      SELECT vc.id AS vendor_certification_id, vc.vendor_id, vc.certificat_id, cs.*
      FROM vendor_certifications vc
      JOIN certification_subcategories cs ON vc.certificat_id = cs.id
      WHERE vc.vendor_id IN (?)
    `;

    db.query(queryCertifications, [userIds], (err, certResult) => {
      if (err) {
        console.error("Помилка при отриманні сертифікацій:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      // Групуємо сертифікації по користувачам
      const certificationsByUser = userIds.reduce((acc, userId) => {
        acc[userId] = certResult.filter((cert) => cert.vendor_id === userId);
        return acc;
      }, {});

      // Додаємо сертифікації до кожного користувача
      const usersWithCertifications = usersResult.map((user) => ({
        ...user,
        certifications: certificationsByUser[user.id] || [],
      }));

      return res.status(200).json(usersWithCertifications);
    });
  });
};
// exports.getUserById = (req, res) => {
//   const userId = req.params.id;

//   // Перевірка, чи був наданий ідентифікатор користувача
//   if (!userId) {
//     return res
//       .status(400)
//       .json({ message: "Не вказаний ідентифікатор користувача" });
//   }

//   // Запит до бази даних на отримання користувача за його ідентифікатором
//   const query = "SELECT * FROM vendors WHERE id=?";
//   db.query(query, [userId], (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні користувача:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     // Перевірка, чи користувач знайдений
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Користувач не знайдений" });
//     }

//     // Якщо користувач успішно знайдений
//     return res.status(200).json(result[0]);
//   });
// };
exports.getUserByFirebaseId = (req, res) => {
  const userId = req.params.id;

  // Перевірка, чи був наданий ідентифікатор користувача
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Не вказаний ідентифікатор користувача" });
  }

  // Запит до бази даних на отримання користувача з таблиці vendors
  const queryVendor = "SELECT * FROM vendors WHERE firebase_id=?";
  db.query(queryVendor, [userId], (err, vendorResult) => {
    if (err) {
      console.error("Помилка при отриманні користувача з vendors:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (vendorResult.length > 0) {
      // Користувач знайдений у таблиці vendors
      return res.status(200).json(vendorResult[0]);
    } else {
      // Запит до бази даних на отримання користувача з таблиці users
      const queryUser = "SELECT * FROM users WHERE firebaseId=?";
      db.query(queryUser, [userId], (err, userResult) => {
        if (err) {
          console.error("Помилка при отриманні користувача з users:", err);
          return res.status(500).json({ message: "Помилка на сервері" });
        }

        if (userResult.length > 0) {
          // Користувач знайдений у таблиці users
          return res.status(200).json(userResult[0]);
        } else {
          // Користувач не знайдений в обох таблицях
          return res
            .status(200)
            .json({ message: "Користувач не знайдений", found: false });
        }
      });
    }
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
  const queryUser = "SELECT * FROM vendors WHERE id=?";
  db.query(queryUser, [userId], (err, userResult) => {
    if (err) {
      console.error("Помилка при отриманні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перевірка, чи користувач знайдений
    if (userResult.length === 0) {
      return res.status(404).json({ message: "Користувач не знайдений" });
    }

    // Запит на отримання сертифікацій для користувача
    const queryCertifications = `
      SELECT vc.id AS vendor_certification_id, vc.vendor_id, vc.certificat_id, cs.*
      FROM vendor_certifications vc
      JOIN certification_subcategories cs ON vc.certificat_id = cs.id
      WHERE vc.vendor_id = ?
    `;

    db.query(queryCertifications, [userId], (err, certResult) => {
      if (err) {
        console.error("Помилка при отриманні сертифікацій:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      // Додаємо сертифікації до користувача
      const user = userResult[0];
      user.certifications = certResult;

      // Якщо користувач успішно знайдений разом із сертифікаціями
      return res.status(200).json(user);
    });
  });
};
exports.createUser = (req, res) => {
  const {
    firstName,
    lastName,
    email,
    brandName,
    firebaseId,
    photo,
    logo,
    brandDescription,
    banner,
    myBrands,
    payoutDetails,
    country,
    state,
    city,
    street,
    zipCode,
    returns,
    refunds,
  } = req.body;

  // Перевірка, чи всі необхідні дані були надіслані

  // Запит до бази даних на додавання нового користувача
  const query = `INSERT INTO vendors (first_name, last_name, email, brand_name, firebase_id, photo, logo, brand_description, banner, my_brand_id, payout_details_id,country, state, city, street, zip_code, returns, refunds) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    query,
    [
      firstName,
      lastName,
      email,
      brandName,
      firebaseId,
      photo || null,
      logo || null,
      brandDescription || null,
      banner || null,
      myBrands || null,
      payoutDetails || null,
      country || null,
      state || null,
      city || null,
      street || null,
      zipCode || null,
      returns || null,
      refunds || null,
    ],
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

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  // Вибір полів, які не є null або undefined
  const validFields = _.pickBy(fieldsToUpdate, _.identity);

  // Перевірка, чи є щось оновлювати
  if (_.isEmpty(validFields)) {
    return res.status(400).json({ message: "Немає даних для оновлення" });
  }

  // Підготовка SQL-запиту
  let updateQuery = `UPDATE vendors SET `;
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

exports.deleteUser = (req, res) => {
  const userId = req.params.id;

  // Перевірка, чи був наданий ідентифікатор користувача
  if (!userId) {
    return res
      .status(400)
      .json({ message: "Не вказаний ідентифікатор користувача" });
  }

  // Запит до бази даних на видалення користувача за його ідентифікатором
  const query = "DELETE FROM vendors WHERE id=?";
  db.query(query, [userId], (err, result) => {
    if (err) {
      console.error("Помилка при видаленні користувача:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо користувача успішно видалено
    return res
      .status(200)
      .json({ status: "success", message: "Користувач успішно видалений" });
  });
};

exports.updateFile = (req, res) => {
  const { id } = req.params;
  let file;
  if (req.files.file) {
    file = req.files.file;
  } else if (req.files.fileT) {
    file = req.files.fileT;
  } else if (req.files.photo) {
    file = req.files.photo;
  } else if (req.files.video) {
    file = req.files.video;
  } else {
    return res.status(400).json({ message: "Файл не було завантажено" });
  }
  console.log(file);
  const filename = file.name;
  const storage = getStorage();

  const fileRef = ref(storage, `foto/${filename}`);
  const uploadTask = uploadBytesResumable(fileRef, file.data);

  uploadTask.on(
    "state_changed",
    null,
    (error) => {
      console.error("Помилка завантаження в Firebase:", error);
      return res.status(500).json({ message: "Помилка на сервері" });
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((url) => {
          let updateField;
          if (req.files.file) {
            updateField = "logo";
          } else if (req.files.fileT) {
            updateField = "banner";
          } else if (req.files.photo) {
            updateField = "photo";
          } else if (req.files.video) {
            updateField = "video";
          }
          const updateUserQuery = `
                        UPDATE vendors
                        SET ${updateField} = ?
                        WHERE id = ?;
                    `;
          db.query(updateUserQuery, [url, id], (err, result) => {
            if (err) {
              console.error(
                "Помилка при оновленні URL файлу користувача:",
                err
              );
              return res.status(500).json({ message: "Помилка на сервері" });
            }
            return res
              .status(200)
              .json({ message: "Файл успішно завантажено і оновлено", url });
          });
        })
        .catch((error) => {
          console.error("Помилка отримання URL з Firebase Storage:", error);
          return res.status(500).json({ message: "Помилка на сервері" });
        });
    }
  );
};

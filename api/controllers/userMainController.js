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

const upload = multer({ dest: "uploads/" });
exports.updateFileUsers = (req, res) => {
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
            updateField = "photo";
          }
          const updateUserQuery = `
                        UPDATE users
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

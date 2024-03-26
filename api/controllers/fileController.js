const db = require("../config/database.js");
const { Readable } = require("stream"); // Імпорт модуля stream
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const axios = require("axios");
const { Buffer } = require("buffer");
const mime = require("mime-types");
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
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const upload = multer({ dest: "uploads/" });
// exports.updateFile = async (req, res, next) => {
//   const { id } = req.params;
//   const startTime = Date.now(); // Зберігаємо час початку виконання функції
//   const uid = uuidv4();
//   let chunkCounter = 0;
//   const projectId = "cleanerio-b080f";
//   const storage = new Storage({
//     projectId,
//   });

//   const fileName = `folder/${uid}.webp`;

//   try {
//     const [buckets] = await storage.getBuckets();

//     const bucketName = "cleanerio-b080f.appspot.com"; // Ви повинні вказати тут свій bucketName
//     const file = storage.bucket(bucketName).file(fileName);
//     const writeStream = file.createWriteStream({
//       metadata: {
//         contentType: req.get("Content-Type"),
//       },
//     });

//     const pipedStreams = req.pipe(writeStream);
//     const result = new Promise((resolve, reject) => {
//       pipedStreams.on("error", function (err) {
//         reject(err);
//       });
//       pipedStreams.on("finish", async function () {
//         const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURI(
//           fileName
//         ).replace(/\//g, "%2F")}`;
//         console.log(publicUrl);
//         try {
//           const response = await axios.get(publicUrl);
//           const url = `${publicUrl}?alt=media&token=${response.data.downloadTokens}`;
//           console.log(url); // Посилання на отриманий файл
//           const endTime = Date.now(); // Зберігаємо час завершення виконання функції
//           const executionTimeInSeconds = (endTime - startTime) / 1000; // Переводимо мілісекунди в секунди
//           console.log(`Function executed in ${executionTimeInSeconds} seconds`);
//           resolve(publicUrl);
//         } catch (error) {
//           console.error("Під час операції виникла проблема:", error);
//           reject(error);
//         }
//       });
//       //////
//     });
//   } catch (error) {
//     console.error("Error:", error);
//     // Обробка помилок
//     next(error);
//   }
// };
// exports.updateFile = (req, res, next) => {
//   const { id } = req.params;
//   let file;
//   console.log("asdfasdf", req.files);
//   if (req.files.file) {
//     file = req.files.file;
//   } else if (req.files.fileT) {
//     file = req.files.fileT;
//   } else {
//     return res.status(400).json({ message: "Файл не було завантажено" });
//   }

//   const filename = file.name;
//   const storage = getStorage();

//   const fileRef = ref(storage, `foto/${filename}`);
//   const uploadTask = uploadBytesResumable(fileRef, file.data);

//   uploadTask.on(
//     "state_changed",
//     null,
//     (error) => {
//       console.error("Помилка завантаження в Firebase:", error);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref)
//         .then((url) => {
//           let updateField;
//           if (req.files.file) {
//             updateField = "logo";
//           } else if (req.files.fileT) {
//             updateField = "banner";
//           }
//           const updateUserQuery = `
//                         UPDATE vendors
//                         SET ${updateField} = ?
//                         WHERE id = ?;
//                     `;
//           db.query(updateUserQuery, [url, id], (err, result) => {
//             if (err) {
//               console.error(
//                 "Помилка при оновленні URL файлу користувача:",
//                 err
//               );
//               return res.status(500).json({ message: "Помилка на сервері" });
//             }
//             return res
//               .status(200)
//               .json({ message: "Файл успішно завантажено і оновлено", url });
//           });
//         })
//         .catch((error) => {
//           console.error("Помилка отримання URL з Firebase Storage:", error);
//           return res.status(500).json({ message: "Помилка на сервері" });
//         });
//     }
//   );
// };
exports.deleteFile = (req, res) => {
  const fileId = req.params.id;

  // Запит на вибірку інформації про файл за його ідентифікатором
  const selectFileQuery = `SELECT * FROM files WHERE id = ?`;

  db.query(selectFileQuery, [fileId], (err, fileResult) => {
    if (err) {
      console.error("Помилка при вибірці файлу:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (fileResult.length === 0) {
      return res.status(404).json({ message: "Файл не знайдено" });
    }

    // Видалення файлу з таблиці
    const deleteFileQuery = `DELETE FROM files WHERE id = ?`;

    db.query(deleteFileQuery, [fileId], (err, deleteResult) => {
      if (err) {
        console.error("Помилка при видаленні файлу:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      // Видалення файлу зі сховища (storage)
      const filePath = fileResult[0].file_path;
      // Додайте код для видалення файлу зі сховища, наприклад, за допомогою fs.unlink або іншого методу

      // Повернення успішного результату
      res.status(200).json({
        status: "success",
        message: "Файл успішно видалено",
        id: fileId,
      });
    });
  });
};
exports.updateFile = async (req, res) => {
  const id = req.params.id;

  try {
    // Перевірка, чи був файл надісланий
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: "Файл не було завантажено" });
    }

    const storage = getStorage();
    const filePromises = [];

    for (const key in req.files) {
      const uploadedFiles = req.files[key];

      if (Array.isArray(uploadedFiles)) {
        for (const uploadedFile of uploadedFiles) {
          processFile(uploadedFile, storage, filePromises, id);
        }
      } else {
        processFile(uploadedFiles, storage, filePromises, id);
      }
    }

    await Promise.all(filePromises);

    return res.status(200).json({
      message: "Файли успішно отримано, збережено та записано в базу даних",
    });
  } catch (error) {
    console.error("Помилка при обробці файлів:", error);
    return res
      .status(500)
      .json({ message: "Помилка на сервері при обробці файлів" });
  }
};

async function processFile(uploadedFile, storage, filePromises, id) {
  const filename = uploadedFile.name;
  const fileRef = ref(storage, `foto/${filename}`);
  const uploadTask = uploadBytesResumable(fileRef, uploadedFile.data);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const photoProgress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      console.error("Error during photo upload: ", error);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(fileRef);

        const fileType = getFileType(filename);

        const sql =
          "INSERT INTO files (product_id, file, type) VALUES (?, ?, ?)";
        db.query(sql, [id, downloadURL, fileType], (err, result) => {
          if (err) {
            console.error("Помилка при вставці даних в таблицю files:", err);
          } else {
            console.log(
              "Файл успішно збережено в Firebase і записано в базу даних"
            );
          }
        });
      } catch (error) {
        console.error("Помилка отримання URL з Firebase Storage:", error);
      }
    },
    (error) => {
      console.error("Помилка завантаження в Firebase:", error);
    }
  );

  filePromises.push(
    new Promise((resolve, reject) => {
      uploadTask.on("state_changed", resolve, reject);
    })
  );
}

// Функція для визначення типу файлу (фото чи відео)
function getFileType(filename) {
  const mimeType = mime.lookup(filename);
  if (mimeType && mimeType.includes("image")) {
    return "photo";
  } else if (mimeType && mimeType.includes("video")) {
    return "video";
  } else {
    return null;
  }
}

// exports.updateFile = (req, res) => {
//   // Перевірка, чи був файл надісланий
//   console.log("req.files", req.files);
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).json({ message: "Файл не було завантажено" });
//   }

//   // Отримання файлу з запиту
//   const uploadedFile = req.files.uploadedFile;

//   // Обробка файлу тут, наприклад, збереження у базу даних або відправка на зберігання

//   // Повернення відповіді клієнту
//   return res.status(200).json({ message: "Файл успішно отримано і оброблено" });
// };

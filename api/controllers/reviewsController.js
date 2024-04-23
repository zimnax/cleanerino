const db = require("../config/database.js");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
exports.createReview = async (req, res) => {
  const { prod_id, name, rating, comment } = req.body;

  try {
    // Insert review data into the database
    const sql =
      "INSERT INTO reviews (prod_id, name, rating, comment) VALUES (?, ?, ?, ?)";
    db.query(sql, [prod_id, name, rating, comment], async (err, result) => {
      if (err) {
        console.error("Error adding review:", err);
        return res.status(500).json({ message: "Error adding review" });
      }

      const reviewId = result.insertId;

      // Check if a file is uploaded
      if (req.files.file) {
        const uploadedFile = req.files.file;
        await processFile(uploadedFile, reviewId);
      }

      return res.status(200).json({ message: "Review added successfully" });
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
async function processFile(uploadedFile, reviewId) {
  const filename = uploadedFile.name;
  const storage = getStorage();
  const fileRef = ref(storage, `reviews/${filename}`);
  const uploadTask = uploadBytesResumable(fileRef, uploadedFile.data);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const photoProgress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Photo upload progress: ", photoProgress);
    },
    (error) => {
      console.error("Error during photo upload: ", error);
    },
    async () => {
      try {
        const downloadURL = await getDownloadURL(fileRef);

        // Оновлення даних про огляд у базі даних
        const sql = "UPDATE reviews SET photo = ? WHERE id = ?";
        db.query(sql, [downloadURL, reviewId], (err, result) => {
          if (err) {
            console.error("Error updating review data in database:", err);
          } else {
            console.log("Photo updated in database successfully");
          }
        });
      } catch (error) {
        console.error("Error getting URL from Firebase Storage:", error);
      }
    },
    (error) => {
      console.error("Error uploading to Firebase:", error);
    }
  );
}

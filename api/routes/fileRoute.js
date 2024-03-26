const express = require("express");
const { updateFile, deleteFile } = require("../controllers/fileController.js");
const router = express.Router();
router.route("/:id").post(updateFile).delete(deleteFile);

module.exports = router;

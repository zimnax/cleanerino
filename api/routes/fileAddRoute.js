const express = require("express");
const { deleteFile } = require("../controllers/fileController.js");
const router = express.Router();
router.route("/:id").post(deleteFile);

module.exports = router;

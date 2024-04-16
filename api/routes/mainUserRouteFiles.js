const express = require("express");
const router = express.Router();
const { updateFileUsers } = require("../controllers/userMainController");
const multer = require("multer");
const os = require("os");

const upload = multer({ dest: os.tmpdir() });

//router.put("/:id", upload.single("file"), updateFile);
router.put("/:id", updateFileUsers);
module.exports = router;

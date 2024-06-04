const express = require("express");
const router = express.Router();
const { updateFile } = require("../controllers/usersControler");
const multer = require("multer");
const os = require("os");

const upload = multer({ dest: os.tmpdir() });

//router.put("/:id", upload.single("file"), updateFile);

router.route("/:id").put(updateFile);
module.exports = router;

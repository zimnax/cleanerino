const express = require("express");
const {
  createNews,
} = require("../../controllers/newsletter/newsletterController");
const router = express.Router();
router.route("/").post(createNews);

module.exports = router;

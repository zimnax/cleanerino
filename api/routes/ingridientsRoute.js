const express = require("express");
const { getAllIngridient } = require("../controllers/ingridientsController");
const router = express.Router();
router.route("/").get(getAllIngridient);

module.exports = router;

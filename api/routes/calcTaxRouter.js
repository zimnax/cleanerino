const express = require("express");
const { calcTax } = require("../controllers/calcTaxController");
const router = express.Router();
router.route("/").post(calcTax);

module.exports = router;

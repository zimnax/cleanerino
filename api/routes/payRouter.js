const express = require("express");
const { createCheckoutSession } = require("../controllers/payController");
const router = express.Router();
router.route("/").post(createCheckoutSession);

module.exports = router;

const express = require("express");
const { successOrder } = require("../controllers/orderSuccessController");
const router = express.Router();
router.route("/").post(successOrder);

module.exports = router;

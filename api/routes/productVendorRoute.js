const express = require("express");
const { getProductsByVendorId } = require("../controllers/productControler");
const router = express.Router();

router.route("/:id").get(getProductsByVendorId);

module.exports = router;

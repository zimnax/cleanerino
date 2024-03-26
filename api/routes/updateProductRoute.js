const express = require("express");
const { updateProduct } = require("../controllers/productControler");
const router = express.Router();

router.route("/:id").post(updateProduct);

module.exports = router;

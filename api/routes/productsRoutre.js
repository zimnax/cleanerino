const express = require("express");
const {
  getAllProduct,
  createProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productControler");
const router = express.Router();
router.route("/").get(getAllProduct).post(createProduct);
router.route("/:id").post(deleteProduct).get(getProductById);

module.exports = router;

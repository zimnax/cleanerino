const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrdersByVendorId,
  updateOrderById,
} = require("../controllers/ordersController");
const router = express.Router();
router.route("/").get(getAllOrders).post(createOrder);
router.route("/:id").get(getOrdersByVendorId).put(updateOrderById);

module.exports = router;

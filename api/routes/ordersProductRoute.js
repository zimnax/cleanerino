const express = require("express");
const {
  createOrderProduct,
} = require("../controllers/ordersProductController");
const router = express.Router();
router.route("/").post(createOrderProduct);
//router.route("/:id").get(getUserById).delete(deleteUser).put(updateUser);

module.exports = router;

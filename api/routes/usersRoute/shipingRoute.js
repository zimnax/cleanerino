const express = require("express");
const {
  getAllUsers,
  updateUserMain,
  createUser,
  getUserById,
} = require("../../controllers/usersController/shipingController");
const router = express.Router();
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUserById).put(updateUserMain);
module.exports = router;

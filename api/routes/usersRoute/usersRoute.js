const express = require("express");
const {
  getAllUsers,

  createUser,
} = require("../../controllers/usersController/usersControler");
const router = express.Router();
router.route("/").get(getAllUsers).post(createUser);

module.exports = router;

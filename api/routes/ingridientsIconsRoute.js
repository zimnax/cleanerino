const express = require("express");
const {
  getAllIngridientsIcon,
} = require("../controllers/ingridientsController");
const router = express.Router();
router.route("/").get(getAllIngridientsIcon);

module.exports = router;

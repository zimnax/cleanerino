const express = require("express");
const { createReview } = require("../controllers/reviewsController");
const router = express.Router();
router.route("/").post(createReview);

module.exports = router;

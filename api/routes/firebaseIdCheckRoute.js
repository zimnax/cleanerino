const express = require("express");
const { getUserByFirebaseId } = require("../controllers/usersControler");
const router = express.Router();

router.route("/:id").get(getUserByFirebaseId);

module.exports = router;

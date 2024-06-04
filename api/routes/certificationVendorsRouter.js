const express = require("express");
const {
  getAllCertification,
  createCertificate,
  getCertificateById,
  deleteCertificate,
  updateCertificate,
} = require("../controllers/vendorCertificationsController");
const router = express.Router();
router.route("/").get(getAllCertification).post(createCertificate);
router
  .route("/:id")
  .get(getCertificateById)
  .delete(deleteCertificate)
  .put(updateCertificate);

module.exports = router;

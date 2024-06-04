const db = require("../config/database.js");
exports.getAllCertification = (req, res) => {
  const query = `
    SELECT 
      vc.id AS vendor_certification_id, 
      vc.vendor_id, 
      vc.certificat_id, 
      cs.*
    FROM 
      vendor_certifications vc
    JOIN 
      certification_subcategories cs ON vc.certificat_id = cs.id;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні сертифікацій:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }
    return res.status(200).json(result);
  });
};

exports.createCertificate = (req, res) => {
  const { vendor_id, certificat_id } = req.body;

  const query = `
    INSERT INTO vendor_certifications (vendor_id, certificat_id) 
    VALUES (?, ?);
  `;

  db.query(query, [vendor_id, certificat_id], (err, result) => {
    if (err) {
      console.error("Помилка при створенні сертифіката:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }
    return res.status(201).json({ message: "Сертифікат створено успішно" });
  });
};

// exports.getCertificateById = (req, res) => {
//   const certificateId = req.params.id;

//   const query = `
//     SELECT
//       vc.id AS vendor_certification_id,
//       vc.vendor_id,
//       vc.certificat_id,
//       cs.*
//     FROM
//       vendor_certifications vc
//     JOIN
//       certification_subcategories cs ON vc.certificat_id = cs.id
//     WHERE vc.id = ?;
//   `;

//   db.query(query, [certificateId], (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні сертифіката за ID:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Сертифікат не знайдено" });
//     }

//     return res.status(200).json(result[0]);
//   });
// };
exports.getCertificateById = (req, res) => {
  const vendorId = req.params.id;

  const query = `
    SELECT 
      id, 
      vendor_id, 
      certificat_id
    FROM 
      vendor_certifications
    WHERE 
      vendor_id = ?;
  `;

  db.query(query, [vendorId], (err, result) => {
    if (err) {
      console.error("Помилка при отриманні сертифікатів за ID вендора:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "Сертифікати не знайдено" });
    }

    return res.status(200).json(result);
  });
};
// exports.getCertificateById = (req, res) => {
//   const vendorId = req.params.id;

//   const query = `
//     SELECT
//       vc.id AS vendor_certification_id,
//       vc.vendor_id,
//       vc.certificat_id,
//       cs.*
//     FROM
//       vendor_certifications vc
//     JOIN
//       certification_subcategories cs ON vc.certificat_id = cs.id
//     WHERE vc.vendor_id = ?;
//   `;

//   db.query(query, [vendorId], (err, result) => {
//     if (err) {
//       console.error("Помилка при отриманні сертифікатів за vendor_id:", err);
//       return res.status(500).json({ message: "Помилка на сервері" });
//     }

//     if (result.length === 0) {
//       return res.status(404).json({ message: "Сертифікати не знайдено" });
//     }

//     return res.status(200).json(result);
//   });
// };

exports.deleteCertificate = (req, res) => {
  const certificateId = req.params.id;

  const query = `
    DELETE FROM vendor_certifications 
    WHERE id = ?;
  `;

  db.query(query, [certificateId], (err, result) => {
    if (err) {
      console.error("Помилка при видаленні сертифіката:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Сертифікат не знайдено" });
    }

    return res.status(200).json({ message: "Сертифікат успішно видалено" });
  });
};

exports.updateCertificate = (req, res) => {
  const certificateId = req.params.id;
  const { vendor_id, certificat_id } = req.body;

  const query = `
    UPDATE vendor_certifications 
    SET vendor_id = ?, certificat_id = ? 
    WHERE id = ?;
  `;

  db.query(query, [vendor_id, certificat_id, certificateId], (err, result) => {
    if (err) {
      console.error("Помилка при оновленні сертифіката:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Сертифікат не знайдено" });
    }

    return res.status(200).json({ message: "Сертифікат успішно оновлено" });
  });
};

const db = require("../config/database.js");
const { Readable } = require("stream"); // Імпорт модуля stream
const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const axios = require("axios");
const { Buffer } = require("buffer");

const fs = require("fs");
const _ = require("lodash");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { app } = require("../function/firebase.js");
const { promisify } = require("util");

exports.deleteProduct = (req, res) => {
  const productId = req.params.id;

  // Запит до бази даних на видалення даних про товар з супутніх таблиць
  const deleteRelatedDataQueries = [
    "DELETE FROM variation WHERE product_id = ?",
    "DELETE FROM dimensions WHERE product_id = ?",
    "DELETE FROM prod_certificate WHERE prod_id = ?",
    "DELETE FROM files WHERE product_id = ?",
  ];

  // Виконання кожного запиту на видалення даних залежностей
  deleteRelatedDataQueries.forEach((query) => {
    db.query(query, [productId], (err, result) => {
      if (err) {
        console.error("Помилка при видаленні супутніх даних:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }
    });
  });

  // Запит до бази даних на видалення продукту
  const deleteProductQuery = `DELETE FROM products WHERE id = ?`;

  db.query(deleteProductQuery, [productId], (err, result) => {
    if (err) {
      console.error("Помилка при видаленні продукту:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Перевірка чи був видалений продукт
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Продукт не знайдено" });
    }

    res.status(200).json({ message: "Продукт успішно видалений" });
  });
};
exports.getProductById = (req, res) => {
  const productId = req.params.id; // Отримати ID товару з параметрів запиту

  // SQL-запит для отримання одного товару за його ID
  let query = `
  SELECT 
  p.id AS product_id, 
  p.product_name, 
  p.short_description, 
  p.long_description, 
  p.quantity, 
  p.ingredients, 
  p.default_size, 
  p.product_category_id, 
  p.product_type_id, 
  p.made_without, 
  p.instructions, 
  p.vendorId, 
  p.local_pickup, 
  ps1.name AS paper_cardboard, 
  ps2.name AS metal, 
  ps3.name AS glass, 
  ps4.name AS recyclable_plastic,
  v.id AS variation_id, 
  v.unit, 
  v.parameter_value, 
  v.price AS variation_price,
  d.id AS dimension_id, 
  d.weight, 
  d.volume, 
  d.price AS dimension_price,
  pc.id AS certificate_id, 
  pc.certif_cat, 
  pc.certif_sub_cat,
  f.id AS file_id,
  f.file, 
  f.type,
  r.id AS review_id,
  r.name AS review_name,
  r.rating,
  r.comment,
  r.photo AS review_photo,
  r.created_at AS created_at
FROM products p
LEFT JOIN variation v ON p.id = v.product_id
LEFT JOIN dimensions d ON p.id = d.product_id
LEFT JOIN prod_certificate pc ON p.id = pc.prod_id
LEFT JOIN files f ON p.id = f.product_id
LEFT JOIN packaging_subcategories ps1 ON p.paper_cardboard_id = ps1.id
LEFT JOIN packaging_subcategories ps2 ON p.metal_id = ps2.id
LEFT JOIN packaging_subcategories ps3 ON p.glass_id = ps3.id
LEFT JOIN packaging_subcategories ps4 ON p.recyclable_plastic_id = ps4.id
LEFT JOIN reviews r ON p.id = r.prod_id
WHERE p.id = ?;`;
  // let query = `
  //   SELECT
  //     p.id AS product_id,
  //     p.product_name,
  //     p.short_description,
  //     p.long_description,
  //     p.quantity,
  //     p.ingredients,
  //     p.default_size,
  //     p.product_category_id,
  //     p.product_type_id,
  //     p.made_without,
  //     p.instructions,
  //     p.vendorId,
  //     p.local_pickup,
  //     ps1.name AS paper_cardboard,
  //     ps2.name AS metal,
  //     ps3.name AS glass,
  //     ps4.name AS recyclable_plastic,
  //     v.id AS variation_id,
  //     v.unit,
  //     v.parameter_value,
  //     v.price,
  //     d.id AS dimension_id,
  //     d.weight,
  //     d.volume,
  //     d.price AS dimension_price,
  //     pc.id AS certificate_id,
  //     pc.certif_cat,
  //     pc.certif_sub_cat,
  //     f.id AS file_id,
  //     f.file,
  //     f.type
  //   FROM products p
  //   LEFT JOIN variation v ON p.id = v.product_id
  //   LEFT JOIN dimensions d ON p.id = d.product_id
  //   LEFT JOIN prod_certificate pc ON p.id = pc.prod_id
  //   LEFT JOIN files f ON p.id = f.product_id
  //   LEFT JOIN packaging_subcategories ps1 ON p.paper_cardboard_id = ps1.id
  //   LEFT JOIN packaging_subcategories ps2 ON p.metal_id = ps2.id
  //   LEFT JOIN packaging_subcategories ps3 ON p.glass_id = ps3.id
  //   LEFT JOIN packaging_subcategories ps4 ON p.recyclable_plastic_id = ps4.id
  //   WHERE p.id = ?;`; // Додаємо умову WHERE для фільтрації за ID

  db.query(query, [productId], (err, result) => {
    if (err) {
      console.error("Помилка при отриманні товару за ID:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Якщо товар знайдено, повертаємо його
    if (result.length > 0) {
      const product = {
        id: result[0].product_id,
        product_name: result[0].product_name,
        short_description: result[0].short_description,
        long_description: result[0].long_description,
        quantity: result[0].quantity,
        vendorId: result[0].vendorId,
        instructions: result[0].instructions,
        made_without: result[0].made_without,
        ingredients: result[0].ingredients,
        local_pickup: result[0].local_pickup,
        default_size: result[0].default_size,
        product_category_id: result[0].product_category_id,
        product_type_id: result[0].product_type_id,
        paper_cardboard: result[0].paper_cardboard,
        metal: result[0].metal,
        glass: result[0].glass,
        recyclable_plastic: result[0].recyclable_plastic,
        variations: [],
        dimensions: [],
        certificates: [],
        files: [],
        reviews: [],
      };

      // Додати дані з таблиць variation, dimensions, prod_certificate та files
      result.forEach((row) => {
        if (
          row.variation_id &&
          !product.variations.some((v) => v.id === row.variation_id)
        ) {
          product.variations.push({
            id: row.variation_id,
            unit: row.unit,
            parameter_value: row.parameter_value,
            price: row.price,
          });
        }

        if (
          row.dimension_id &&
          !product.dimensions.some((d) => d.id === row.dimension_id)
        ) {
          product.dimensions.push({
            id: row.dimension_id,
            weight: row.weight,
            volume: row.volume,
            price: row.dimension_price,
          });
        }

        if (
          row.certificate_id &&
          !product.certificates.some((c) => c.id === row.certificate_id)
        ) {
          product.certificates.push({
            id: row.certificate_id,
            certif_cat: row.certif_cat,
            certif_sub_cat: row.certif_sub_cat,
          });
        }

        if (row.file_id && !product.files.some((f) => f.id === row.file_id)) {
          product.files.push({
            id: row.file_id,
            file: row.file,
            type: row.type,
          });
        }
        if (
          row.review_id &&
          !product.reviews.some((r) => r.id === row.review_id)
        ) {
          product.reviews.push({
            id: row.review_id,
            name: row.review_name,
            rating: row.rating,
            comment: row.comment,
            photo: row.review_photo,
            created_at: row.created_at,
          });
        }
      });

      res.status(200).json({ product });
    } else {
      // Якщо товар не знайдено, повертаємо помилку 404
      res.status(404).json({ message: "Товар не знайдено" });
    }
  });
};
exports.getAllProduct = (req, res) => {
  let query = `
    SELECT 
      p.id AS product_id, 
      p.product_name, 
      p.short_description, 
      p.long_description, 
      p.quantity, 
      p.ingredients, 
      p.default_size, 
      p.product_category_id, 
      p.product_type_id, 
      p.made_without, 
      p.instructions, 
      p.vendorId, 
      p.local_pickup, 
      ps1.name AS paper_cardboard, 
      ps2.name AS metal, 
      ps3.name AS glass, 
      ps4.name AS recyclable_plastic,
      v.id AS variation_id, 
      v.unit, 
      v.parameter_value, 
      v.price,
      d.id AS dimension_id, 
      d.weight, 
      d.volume, 
      d.price AS dimension_price,
      pc.id AS certificate_id, 
      pc.certif_cat, 
      pc.certif_sub_cat,
      pc.prod_id AS prod_id,
      f.id AS file_id,
      f.file, 
      f.type
    FROM products p
    LEFT JOIN variation v ON p.id = v.product_id
    LEFT JOIN dimensions d ON p.id = d.product_id
    LEFT JOIN prod_certificate pc ON p.id = pc.prod_id
    LEFT JOIN files f ON p.id = f.product_id
    LEFT JOIN packaging_subcategories ps1 ON p.paper_cardboard_id = ps1.id
    LEFT JOIN packaging_subcategories ps2 ON p.metal_id = ps2.id
    LEFT JOIN packaging_subcategories ps3 ON p.glass_id = ps3.id
    LEFT JOIN packaging_subcategories ps4 ON p.recyclable_plastic_id = ps4.id
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Помилка при отриманні продуктів:", err);
      return res.status(500).json({ message: "Помилка на сервері" });
    }

    // Групуємо дані за id продукту
    const products = {};
    result.forEach((row) => {
      const productId = row.product_id;
      if (!products[productId]) {
        products[productId] = {
          id: productId,
          product_name: row.product_name,
          short_description: row.short_description,
          long_description: row.long_description,
          quantity: row.quantity,
          vendorId: row.vendorId,
          instructions: row.instructions,
          made_without: row.made_without,
          ingredients: row.ingredients,
          local_pickup: row.local_pickup,
          default_size: row.default_size,
          product_category_id: row.product_category_id,
          product_type_id: row.product_type_id,
          paper_cardboard: row.paper_cardboard,
          metal: row.metal,
          glass: row.glass,
          recyclable_plastic: row.recyclable_plastic,
          variations: [],
          dimensions: [],
          certificates: [],
          files: [],
        };
      }

      // Додаємо дані з таблиці variation, якщо не дублюється
      if (
        row.variation_id &&
        !products[productId].variations.some((v) => v.id === row.variation_id)
      ) {
        products[productId].variations.push({
          id: row.variation_id,
          unit: row.unit,
          parameter_value: row.parameter_value,
          price: row.price,
        });
      }

      // Додаємо дані з таблиці dimensions, якщо не дублюється
      if (
        row.dimension_id &&
        !products[productId].dimensions.some((d) => d.id === row.dimension_id)
      ) {
        products[productId].dimensions.push({
          id: row.dimension_id,
          weight: row.weight,
          volume: row.volume,
          price: row.dimension_price,
        });
      }

      // Додаємо дані з таблиці prod_certificate, якщо не дублюється
      if (
        row.certificate_id &&
        !products[productId].certificates.some(
          (c) => c.id === row.certificate_id
        )
      ) {
        products[productId].certificates.push({
          id: row.certificate_id,
          prod_id: row.prod_id,
          certif_cat: row.certif_cat,
          certif_sub_cat: row.certif_sub_cat,
        });
      }

      // Додаємо дані з таблиці files, якщо не дублюється
      if (
        row.file_id &&
        !products[productId].files.some((f) => f.id === row.file_id)
      ) {
        products[productId].files.push({
          id: row.file_id,
          file: row.file,
          type: row.type,
        });
      }
    });

    // Перетворюємо об'єкт в масив продуктів
    const productList = Object.values(products);

    res.status(200).json({ products: productList });
  });
};
exports.createProduct = (req, res) => {
  const {
    prodName,
    shortDesc,
    longDesc,
    selectedCategoryId,
    selectedTypeId,
    glass,
    metal,
    paper,
    plastic,
    quantity,
    words,
    sizes,
    shape,
    scent,
    color,
    weight,
    volume,
    productPrice,
    activeNames,
    wordsWithout,
    instruction,
    vendorId,
    local_pickup,
  } = req.body;

  let pro;

  // Перевірка, чи всі обов'язкові дані були надіслані
  if (
    !prodName ||
    !shortDesc ||
    !selectedCategoryId ||
    !selectedTypeId ||
    !quantity
  ) {
    return res
      .status(400)
      .json({ message: "Будь ласка, надайте всі обов'язкові дані" });
  }

  let responseSent = false; // Флаг для відправлення відповіді

  // Запит до бази даних на додавання нового товару
  const query = `INSERT INTO products 
                 (product_name, short_description, long_description, quantity, ingredients, product_category_id, product_type_id, glass_id, metal_id, paper_cardboard_id, recyclable_plastic_id, made_without, instructions, vendorId, local_pickup)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [
      prodName,
      shortDesc,
      longDesc,
      quantity,
      words.join(", "),
      selectedCategoryId,
      selectedTypeId,
      glass || null,
      metal || null,
      paper || null,
      plastic || null,
      wordsWithout.join(", "),
      instruction || null,
      vendorId,
      local_pickup,
    ],
    (err, result) => {
      if (err) {
        console.error("Помилка при створенні товару:", err);
        if (!responseSent) {
          res.status(500).json({ message: "Помилка на сервері" });
          responseSent = true;
        }
        return;
      }

      const productId = result.insertId;
      pro = result.insertId;
      const dimensionQueryOne = `INSERT INTO dimensions (product_id, weight, volume, price) VALUES (?, ?, ?, ?)`;

      db.query(
        dimensionQueryOne,
        [productId, weight, volume, productPrice],
        (err, dimensionResult) => {
          if (err) {
            console.error("Помилка при додаванні розмірів товару:", err);
            if (!responseSent) {
              res.status(500).json({ message: "Помилка на сервері" });
              responseSent = true;
            }
            return;
          }

          shape.forEach((item) => {
            if (item.shape !== "" || item.price !== 0) {
              const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
              db.query(
                variationQuery,
                [productId, "shape", item.shape, item.price],
                (err, variationResult) => {
                  if (err) {
                    console.error(
                      "Помилка при додаванні варіацій товару:",
                      err
                    );
                    return res
                      .status(500)
                      .json({ message: "Помилка на сервері" });
                  }
                }
              );
            }
          });

          // Додавання даних до таблиці variation для об'єктів scent
          scent.forEach((item) => {
            if (item.scent !== "" || item.price !== 0) {
              const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
              db.query(
                variationQuery,
                [productId, "scent", item.scent, item.price],
                (err, variationResult) => {
                  if (err) {
                    console.error(
                      "Помилка при додаванні варіацій товару:",
                      err
                    );
                    return res
                      .status(500)
                      .json({ message: "Помилка на сервері" });
                  }
                }
              );
            }
          });

          // Додавання даних до таблиці variation для об'єктів color
          color.forEach((item) => {
            if (item.color !== "" || item.price !== 0) {
              const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
              db.query(
                variationQuery,
                [productId, "color", item.color, item.price],
                (err, variationResult) => {
                  if (err) {
                    console.error(
                      "Помилка при додаванні варіацій товару:",
                      err
                    );
                    return res
                      .status(500)
                      .json({ message: "Помилка на сервері" });
                  }
                }
              );
            }
          });
          // Перевірка наявності розмірів товару
          if (
            sizes.length === 1 &&
            sizes[0].weight === 0 &&
            sizes[0].volume === 0 &&
            sizes[0].price === 0
          ) {
            console.log("Розміри товару не вказані або мають значення 0");
          } else {
            for (let i = 0; i < sizes.length; i++) {
              const size = sizes[i];
              if (size.weight !== 0 || size.volume !== 0 || size.price !== 0) {
                const dimensionQuery = `INSERT INTO dimensions (product_id, weight, volume, price) VALUES (?, ?, ?, ?)`;
                db.query(
                  dimensionQuery,
                  [productId, size.weight, size.volume, size.price],
                  (err, dimensionResult) => {
                    if (err) {
                      console.error(
                        "Помилка при додаванні розмірів товару:",
                        err
                      );
                      if (!responseSent) {
                        res.status(500).json({ message: "Помилка на сервері" });
                        responseSent = true;
                      }
                      return;
                    }
                  }
                );
              }
            }
          }
          if (activeNames.length > 0) {
            activeNames.forEach((item) => {
              const { category, subcategory } = item;
              const certificateQuery = `INSERT INTO prod_certificate (prod_id, certif_cat, certif_sub_cat) VALUES (?, ?, ?)`;
              db.query(
                certificateQuery,
                [productId, category, subcategory],
                (err, certificateResult) => {
                  if (err) {
                    console.error(
                      "Помилка при додаванні даних до таблиці prod_certificate:",
                      err
                    );
                    if (!responseSent) {
                      res.status(500).json({ message: "Помилка на сервері" });
                      responseSent = true;
                    }
                    return;
                  }
                }
              );
            });
          }
          if (!responseSent) {
            res.status(200).json({
              status: "success",
              message: "Товар успішно доданий",
              id: pro,
            });
            responseSent = true;
            console.log("Aded");
          }
        }
      );
    }
  );
};
// exports.updateProduct = (req, res) => {
//   const productId = req.params.id;
//   const updatedData = req.body;
//   console.log("color", updatedData);
//   // Оновлення даних в основній таблиці товарів
//   const updateProductQuery = `UPDATE products
//                               SET
//                                 product_name = ?,
//                                 short_description = ?,
//                                 long_description = ?,
//                                 quantity = ?,
//                                 ingredients = ?,
//                                 product_category_id = ?,
//                                 product_type_id = ?,
//                                 glass_id = ?,
//                                 metal_id = ?,
//                                 paper_cardboard_id = ?,
//                                 recyclable_plastic_id = ?,
//                                 made_without = ?,
//                                 instructions = ?,
//                                 vendorId = ?,
//                                 local_pickup = ?
//                               WHERE id = ?`;

//   db.query(
//     updateProductQuery,
//     [
//       updatedData.prodName,
//       updatedData.shortDesc,
//       updatedData.longDesc,
//       updatedData.quantity,
//       updatedData.words.join(", "),
//       updatedData.selectedCategoryId,
//       updatedData.selectedTypeId,
//       updatedData.glass || null,
//       updatedData.metal || null,
//       updatedData.paper || null,
//       updatedData.plastic || null,
//       updatedData.wordsWithout.join(", "),
//       updatedData.instruction || null,
//       updatedData.vendorId,
//       updatedData.local_pickup,
//       productId,
//     ],
//     (err, productResult) => {
//       if (err) {
//         console.error("Помилка при оновленні даних товару:", err);
//         return res.status(500).json({ message: "Помилка на сервері" });
//       }

//       // Оновлення даних у таблиці розмірів (dimensions)
//       const updateDimensionsQuery = `UPDATE dimensions
//                                      SET
//                                        weight = ?,
//                                        volume = ?,
//                                        price = ?
//                                      WHERE product_id = ?`;

//       db.query(
//         updateDimensionsQuery,
//         [
//           updatedData.weight,
//           updatedData.volume,
//           updatedData.productPrice,
//           productId,
//         ],
//         (err, dimensionResult) => {
//           if (err) {
//             console.error("Помилка при оновленні даних розмірів товару:", err);
//             return res.status(500).json({ message: "Помилка на сервері" });
//           }

//           // Оновлення даних у таблиці варіацій (variation) для форми, аромату та кольору
//           // const updateVariationQuery = `UPDATE variation
//           //                               SET
//           //                                 price = ?
//           //                               WHERE product_id = ? AND unit = ? AND parameter_value = ?`;

//           // updatedData.shape.forEach((item) => {
//           //   db.query(
//           //     updateVariationQuery,
//           //     [item.price, productId, "shape", item.shape],
//           //     (err, variationResult) => {
//           //       if (err) {
//           //         console.error(
//           //           "Помилка при оновленні даних форми товару:",
//           //           err
//           //         );
//           //         return res
//           //           .status(500)
//           //           .json({ message: "Помилка на сервері" });
//           //       }
//           //     }
//           //   );
//           // });

//           // updatedData.scent.forEach((item) => {
//           //   db.query(
//           //     updateVariationQuery,
//           //     [item.price, productId, "scent", item.scent],
//           //     (err, variationResult) => {
//           //       if (err) {
//           //         console.error(
//           //           "Помилка при оновленні даних аромату товару:",
//           //           err
//           //         );
//           //         return res
//           //           .status(500)
//           //           .json({ message: "Помилка на сервері" });
//           //       }
//           //     }
//           //   );
//           // });

//           // updatedData.color.forEach((item) => {
//           //   db.query(
//           //     updateVariationQuery,
//           //     [item.price, productId, "color", item.color],
//           //     (err, variationResult) => {
//           //       if (err) {
//           //         console.error(
//           //           "Помилка при оновленні даних кольору товару:",
//           //           err
//           //         );
//           //         return res
//           //           .status(500)
//           //           .json({ message: "Помилка на сервері" });
//           //       }
//           //     }
//           //   );
//           // });
//           const deleteVariationQuery = `DELETE FROM variation WHERE product_id = ?`;

//           db.query(deleteVariationQuery, [productId], (err, deleteResult) => {
//             if (err) {
//               console.error(
//                 "Помилка при видаленні попередніх даних варіацій:",
//                 err
//               );
//               return res.status(500).json({ message: "Помилка на сервері" });
//             }
//           });
//           updatedData.shape.forEach((item) => {
//             if (item.shape !== "" || item.price !== 0) {
//               const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
//               db.query(
//                 variationQuery,
//                 [productId, "shape", item.shape, item.price],
//                 (err, variationResult) => {
//                   if (err) {
//                     console.error(
//                       "Помилка при додаванні варіацій форми товару:",
//                       err
//                     );
//                     return res
//                       .status(500)
//                       .json({ message: "Помилка на сервері" });
//                   }
//                 }
//               );
//             }
//           });

//           // Додавання даних до таблиці variation для об'єктів scent
//           updatedData.scent.forEach((item) => {
//             if (item.scent !== "" || item.price !== 0) {
//               const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
//               db.query(
//                 variationQuery,
//                 [productId, "scent", item.scent, item.price],
//                 (err, variationResult) => {
//                   if (err) {
//                     console.error(
//                       "Помилка при додаванні варіацій аромату товару:",
//                       err
//                     );
//                     return res
//                       .status(500)
//                       .json({ message: "Помилка на сервері" });
//                   }
//                 }
//               );
//             }
//           });

//           // Додавання даних до таблиці variation для об'єктів color
//           updatedData.color.forEach((item) => {
//             if (item.color !== "" || item.price !== 0) {
//               const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
//               db.query(
//                 variationQuery,
//                 [productId, "color", item.color, item.price],
//                 (err, variationResult) => {
//                   if (err) {
//                     console.error(
//                       "Помилка при додаванні варіацій кольору товару:",
//                       err
//                     );
//                     return res
//                       .status(500)
//                       .json({ message: "Помилка на сервері" });
//                   }
//                 }
//               );
//             }
//           });

//           // Оновлення даних у таблиці сертифікатів (prod_certificate)
//           if (updatedData.activeNames.length > 0) {
//             const deleteCertQuery = `DELETE FROM prod_certificate WHERE prod_id = ?`;
//             db.query(deleteCertQuery, [productId], (err, deleteCertResult) => {
//               if (err) {
//                 console.error(
//                   "Помилка при видаленні даних про активні назви товару:",
//                   err
//                 );
//                 return res.status(500).json({ message: "Помилка на сервері" });
//               }

//               updatedData.activeNames.forEach((item) => {
//                 const { category, subcategory } = item;
//                 const insertCertQuery = `INSERT INTO prod_certificate (prod_id, certif_cat, certif_sub_cat) VALUES (?, ?, ?)`;
//                 db.query(
//                   insertCertQuery,
//                   [productId, category, subcategory],
//                   (err, insertCertResult) => {
//                     if (err) {
//                       console.error(
//                         "Помилка при додаванні даних про активні назви товару:",
//                         err
//                       );
//                       return res
//                         .status(500)
//                         .json({ message: "Помилка на сервері" });
//                     }
//                   }
//                 );
//               });
//             });
//           }

//           // Повернення успішного результату
//           res.status(200).json({
//             status: "success",
//             message: "Дані товару успішно оновлені",
//             id: productId,
//           });
//         }
//       );
//     }
//   );
// };
exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;

  const updateProductQuery = `UPDATE products 
                              SET 
                                product_name = ?, 
                                short_description = ?, 
                                long_description = ?, 
                                quantity = ?, 
                                ingredients = ?, 
                                product_category_id = ?, 
                                product_type_id = ?, 
                                glass_id = ?, 
                                metal_id = ?, 
                                paper_cardboard_id = ?, 
                                recyclable_plastic_id = ?,
                                made_without = ?,
                                instructions = ?,
                                vendorId = ?,
                                local_pickup = ?
                              WHERE id = ?`;

  db.query(
    updateProductQuery,
    [
      updatedData.prodName,
      updatedData.shortDesc,
      updatedData.longDesc,
      updatedData.quantity,
      updatedData.words.join(", "),
      updatedData.selectedCategoryId,
      updatedData.selectedTypeId,
      updatedData.glass || null,
      updatedData.metal || null,
      updatedData.paper || null,
      updatedData.plastic || null,
      updatedData.wordsWithout.join(", "),
      updatedData.instruction || null,
      updatedData.vendorId,
      updatedData.local_pickup,
      productId,
    ],
    (err, productResult) => {
      if (err) {
        console.error("Помилка при оновленні даних товару:", err);
        return res.status(500).json({ message: "Помилка на сервері" });
      }

      // Оновлення даних у таблиці розмірів (dimensions)
      const updateDimensionsQuery = `UPDATE dimensions 
                                     SET 
                                       weight = ?, 
                                       volume = ?, 
                                       price = ? 
                                     WHERE product_id = ?`;

      db.query(
        updateDimensionsQuery,
        [
          updatedData.weight,
          updatedData.volume,
          updatedData.productPrice,
          productId,
        ],
        (err, dimensionResult) => {
          if (err) {
            console.error("Помилка при оновленні даних розмірів товару:", err);
            return res.status(500).json({ message: "Помилка на сервері" });
          }
          //видалення з dimensions
          const deleteDimensionsQuery = `DELETE FROM dimensions WHERE product_id = ?`;
          db.query(
            deleteDimensionsQuery,
            [productId],
            (err, deleteDimensionsResult) => {
              if (err) {
                console.error("Помилка при видаленні даних розмірів:", err);
                return res.status(500).json({ message: "Помилка на сервері" });
              }
            }
          );
          console.log("sizes", updatedData.sizes);
          updatedData.sizes.forEach((dim) => {
            const insertDimensionsQuery = `INSERT INTO dimensions (product_id, weight, volume, price) VALUES (?, ?, ?, ?)`;
            console.log("dim", dim);
            db.query(
              insertDimensionsQuery,
              [parseFloat(productId), dim.weight, dim.volume, dim.price],
              (err, dimensionsResult) => {
                if (err) {
                  console.error(
                    "Помилка при додаванні нових даних розмірів:",
                    err
                  );
                  return res
                    .status(500)
                    .json({ message: "Помилка на сервері" });
                }
              }
            );
          });

          // Видалення попередніх даних варіацій (форми, аромату, кольору)
          const deleteVariationQuery = `DELETE FROM variation WHERE product_id = ?`;

          db.query(deleteVariationQuery, [productId], (err, deleteResult) => {
            if (err) {
              console.error(
                "Помилка при видаленні попередніх даних варіацій:",
                err
              );
              return res.status(500).json({ message: "Помилка на сервері" });
            }

            // Додавання нових даних варіацій (форми, аромату, кольору)
            updatedData.shape.forEach((item) => {
              if (item.shape !== "" || item.price !== 0) {
                const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
                db.query(
                  variationQuery,
                  [productId, "shape", item.shape, item.price],
                  (err, variationResult) => {
                    if (err) {
                      console.error(
                        "Помилка при додаванні варіацій форми товару:",
                        err
                      );
                      return res
                        .status(500)
                        .json({ message: "Помилка на сервері" });
                    }
                  }
                );
              }
            });

            updatedData.scent.forEach((item) => {
              if (item.scent !== "" || item.price !== 0) {
                const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
                db.query(
                  variationQuery,
                  [productId, "scent", item.scent, item.price],
                  (err, variationResult) => {
                    if (err) {
                      console.error(
                        "Помилка при додаванні варіацій аромату товару:",
                        err
                      );
                      return res
                        .status(500)
                        .json({ message: "Помилка на сервері" });
                    }
                  }
                );
              }
            });

            updatedData.color.forEach((item) => {
              if (item.color !== "" || item.price !== 0) {
                const variationQuery = `INSERT INTO variation (product_id, unit, parameter_value, price) VALUES (?, ?, ?, ?)`;
                db.query(
                  variationQuery,
                  [productId, "color", item.color, item.price],
                  (err, variationResult) => {
                    if (err) {
                      console.error(
                        "Помилка при додаванні варіацій кольору товару:",
                        err
                      );
                      return res
                        .status(500)
                        .json({ message: "Помилка на сервері" });
                    }
                  }
                );
              }
            });

            const deleteCertQuery = `DELETE FROM prod_certificate WHERE prod_id = ?`;
            db.query(deleteCertQuery, [productId], (err, deleteCertResult) => {
              if (err) {
                console.error(
                  "Помилка при видаленні даних про активні назви товару:",
                  err
                );
                return res.status(500).json({ message: "Помилка на сервері" });
              }
              console.log("deleteCertResult", updatedData.activeNames);
              // Додавання нових даних сертифікатів
              if (updatedData.activeNames.length > 0) {
                const insertCertQuery = `INSERT INTO prod_certificate (prod_id, certif_cat, certif_sub_cat) VALUES ?`;
                const certData = updatedData.activeNames.map((item) => [
                  productId,
                  item.category,
                  item.subcategory,
                ]);
                db.query(
                  insertCertQuery,
                  [certData],
                  (err, insertCertResult) => {
                    if (err) {
                      console.error(
                        "Помилка при додаванні даних про активні назви товару:",
                        err
                      );
                      return res
                        .status(500)
                        .json({ message: "Помилка на сервері" });
                    }
                    // Повернення успішного результату
                    res.status(200).json({
                      status: "success",
                      message: "Дані товару успішно оновлені",
                      id: productId,
                    });
                  }
                );
              } else {
                // Повернення успішного результату
                res.status(200).json({
                  status: "success",
                  message: "Дані товару успішно оновлені",
                  id: productId,
                });
              }
            });
          });
        }
      );
    }
  );
};

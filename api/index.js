const express = require("express");
const db = require("./config/database.js");
const userRoutes = require("./routes/userRoutes.js");
const userRoutesDet = require("./routes/userRoutDet.js");
const userRouteFiles = require("./routes/userRouteFiles.js");
const mainUserRouteFiles = require("./routes/mainUserRouteFiles.js");
const bodyParser = require("body-parser");
const productsRoute = require("./routes/productsRoutre.js");
const categoriesRoutes = require("./routes/categoriesRoutes.js");
const subcategoriesRoutes = require("./routes/subcategoriesRoutes.js");
const packagingRoutes = require("./routes/packagingRoutes.js");
const certificatesRoutes = require("./routes/certificatesRoutes.js");
const updateProductRoute = require("./routes/updateProductRoute.js");
const fileRoute = require("./routes/fileRoute.js");
const fileAddRoute = require("./routes/fileAddRoute.js");
const cardRouter = require("./routes/cardRouter.js");
const newsletterRoute = require("./routes/newsletter/newsletterRoute.js");
const usersRoute = require("./routes/usersRoute/usersRoute.js");
const shipingRoute = require("./routes/usersRoute/shipingRoute.js");
const ingridientsRoute = require("./routes/ingridientsRoute.js");
const ingridientsIconsRoute = require("./routes/ingridientsIconsRoute.js");
const calcTaxRouter = require("./routes/calcTaxRouter.js");
const payRouter = require("./routes/payRouter.js");
const reviewsRouter = require("./routes/reviewsRouter.js");
const fileUpload = require("express-fileupload");

const cors = require("cors");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://cleanerino.com");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use("/api/v1/taxcalc", calcTaxRouter);
app.use("/api/v1/pay", payRouter);
app.use("/api/v1/reviews", reviewsRouter);
app.use("/api/v1/ingridients", ingridientsRoute);
app.use("/api/v1/ingridients/icon", ingridientsIconsRoute);
app.use("/api/v1/vendor/profile", userRoutes);
app.use("/api/v1/vendor/product/file", fileRoute);
app.use("/api/v1/vendor/product/fileAdd", fileAddRoute);
app.use("/api/v1/vendor/product/add", productsRoute);
app.use("/api/v1/vendor/product/update", updateProductRoute);
app.use("/api/v1/users/newsletter", newsletterRoute);

app.use("/api/v1/vendor/product/category", categoriesRoutes);
app.use("/api/v1/vendor/product/subcategory", subcategoriesRoutes);
app.use("/api/v1/vendor/product/packaging", packagingRoutes);
app.use("/api/v1/vendor/product/certificates", certificatesRoutes);
app.use("/api/v1/users/profile", usersRoute);
app.use("/api/v1/users/address", shipingRoute);

app.use("/api/v1/vendor/file", userRouteFiles);
app.use("/api/v1/user/file", mainUserRouteFiles);
app.use("/api/v1/vendor/det", userRoutesDet);
app.use("/api/v1/vendor/card", cardRouter);

app.listen(4000, () => console.log("Server running at port 4000"));

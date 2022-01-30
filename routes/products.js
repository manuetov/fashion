const express = require("express");
const router = express.Router();
const uploadImages = require("../middleware/multer");
const productController = require("../controllers/productController");

// ruta raíz: localhost:3000/products

//localhost:3000/products/showFormProduct/:vendor_id
router.get("/showFormProduct/:vendor_id", productController.showFormProduct);

//localhost:3000/products/createProduct/:vendor_id
router.post("/createProduct/:vendor_id", uploadImages("products"),
  productController.createProduct);

//localhost:3000/products/deleteProduct/:product_id
router.get("/deleteProduct/:product_id/:vendor_id", productController.deleteProduct);

//localhost:3000/products/showEditFormProduct/:product_id
router.get("/showEditFormProduct/:product_id", productController.showEditFormProduct);

//localhost:3000/products/updateProduct/:product_id/:vendor_id
router.post("/updateProduct/:product_id/:vendor_id", uploadImages("products"),
  productController.updateProduct);

module.exports = router;
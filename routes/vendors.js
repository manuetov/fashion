var express = require("express");
var router = express.Router();
const vendorsController = require("../controllers/vendorsController");
const uploadImg = require("../middleware/multer");

// ruta raíz de este archivo: localhost:3000/vendors

//localhost:3000/vendors
router.get("/", vendorsController.selectAllVendors);

//localhost:3000/vendors/oneVendor/:vendor_id
router.get("/onevendor/:vendor_id", vendorsController.selectOneVendor);

//localhost:3000/vendors/createVendor
router.get("/createvendor", vendorsController.viewFormVendor);

//localhost:3000/vendors/createVendor
router.post("/createvendor", uploadImg("vendors"), vendorsController.createVendor);

//localhost:3000/vendors/deleteVendor/:vendor_id
router.get("/deletevendor/:vendor_id", vendorsController.deleteVendor);

//locahost:3000/vendors/showUpdateVendorForm/:vendor_id
router.get("/showUpdateVendorForm/:vendor_id", vendorsController.showUpdateVendorForm);

//localhost:3000/vendors/saveUpdatevendor/:vendor_id
router.post("/saveUpdatevendor/:vendor_id", uploadImg("vendors"),
 vendorsController.updateVendor);

// localhost:3000/vendors/login
router.get("/login", vendorsController.showLoginForm);

//localhost:3000/vendors/login
router.post("/login", vendorsController.login);

module.exports = router;

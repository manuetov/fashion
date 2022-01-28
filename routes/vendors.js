var express = require("express");
var router = express.Router();
const vendorsController = require("../controllers/vendorsController");

//localhost:3000/users
router.get("/", vendorsController.selectAllVendors);


//localhost:3000/oneVendor/:vendor_id
router.get("/oneVendor/:vendor_id", vendorsController.selectOneVendor);


module.exports = router;
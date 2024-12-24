const express = require("express");
const router = express.Router();
//Insert Model
const Supplier = require("../model/SupplierModel")
// Insert Supplier Controller
const SupplierController = require ("../controllers/SupplierControllers");

router.get("/",SupplierController.getAllSuppliers);
router.post("/",SupplierController.addSuppliers);
router.get("/:id",SupplierController.getById);
router.put("/:id",SupplierController.updateSupplier);
router.delete("/:id",SupplierController.deleteSupplier);
 
//export
module.exports = router;
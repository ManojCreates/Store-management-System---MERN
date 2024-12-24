const express = require("express");
const router = express.Router();
//Insert Model
const CustomerMaintenance = require("../Model/CustomerMaintenanceModel");
//Insert User Conntroller
const CustomerMaintenanceControllers = require("../Controllers/CustomerMaintenanceControllers");

router.get("/",CustomerMaintenanceControllers.getAllCustomerMaintenances);
router.post("/",CustomerMaintenanceControllers.addCustomerMaintenances);
router.get("/:id",CustomerMaintenanceControllers.getByCustomerMaintenanceId);
router.put("/:id",CustomerMaintenanceControllers.updateCustomerMaintenance);
router.delete("/:id",CustomerMaintenanceControllers.deleteCustomerMaintenance);

//export
module.exports = router;
const express = require("express");
const router = express.Router();
//Insert Model
const AdminMaintenance = require("../Model/AdminMaintenanceModel");
//Insert User Conntroller
const AdminMaintenanceControllers = require("../Controllers/AdminMaintenanceControllers");

router.get("/",AdminMaintenanceControllers.getAllAdminMaintenances);
router.post("/",AdminMaintenanceControllers.addAdminMaintenances);
router.get("/:id",AdminMaintenanceControllers.getByAdminMaintenanceId);
router.put("/:id",AdminMaintenanceControllers.updateAdminMaintenance);
router.delete("/:id",AdminMaintenanceControllers.deleteAdminMaintenance);

//export
module.exports = router;
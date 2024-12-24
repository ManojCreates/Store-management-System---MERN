const express = require("express");
const router = express.Router();
//Insert Model
const AdminDelivery = require("../Model/AdminDeliveryModel");
//Insert User Conntroller
const AdminDeliveryControllers = require("../Controllers/AdminDeliveryControllers");

router.get("/",AdminDeliveryControllers.getAllAdminDeliveries);
router.post("/",AdminDeliveryControllers.addAdminDeliveries);
router.get("/:id",AdminDeliveryControllers.getByAdminDeliveryId);
router.put("/:id",AdminDeliveryControllers.updateAdminDelivery);
router.delete("/:id",AdminDeliveryControllers.deleteAdminDelivery);

//export
module.exports = router;
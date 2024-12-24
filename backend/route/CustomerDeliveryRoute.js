const express = require("express");
const router = express.Router();
//Insert Model
const CustomerDelivery= require("../Model/CustomerDeliveryModel");
//Insert User Conntroller
const CustomerDeliveryControllers = require("../Controllers/CustomerDeliveryControllers");

router.get("/",CustomerDeliveryControllers.getAllCustomerDelivery);
router.post("/",CustomerDeliveryControllers.addCustomerDelivery);
router.get("/:id",CustomerDeliveryControllers.getByCustomerDeliveryId);
router.put("/:id",CustomerDeliveryControllers.updateCustomerDelivery);
router.delete("/:id",CustomerDeliveryControllers.deleteCustomerDelivery);

//export
module.exports = router;
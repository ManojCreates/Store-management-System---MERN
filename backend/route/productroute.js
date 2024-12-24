const express = require("express");
const router = express.Router();
//model
const user = require("../model/productmodel");
//controller
const productcontroller = require("../controllers/productcon");

router.get("/",productcontroller.getallproduct);
router.post("/",productcontroller.insertproduct);
router.get("/:id",productcontroller.getproductid);
router.put("/:id",productcontroller.updateproduct);
router.delete("/:id",productcontroller.deleteproduct);

module.exports = router;


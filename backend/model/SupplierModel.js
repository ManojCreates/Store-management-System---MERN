const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SupplierSchema = new Schema({
    SupplierName:{
        type:String,//data type
        required:true,//validate
    },
    ContactPerson:{
        type:String,//data type
        required:true,//validate
    },
    SupplierEmail:{
        type:String,//data type
        required:true,//validate
    },
    SupplierPhoneNumber:{
        type:Number,//data type
        required:true,//validate
    },
    SupplierAddress:{
        type:String,//data type
        required:true,//validate
    },
    SupplierProducts:{
        type:String,//data type
        required:true,//validate
    },
    SupplierRating:{
        type:String,//data type
        required:true,//validate
    },
    });

module.exports = mongoose.model(
    "SupplierModel",//file name
    SupplierSchema //function name
)
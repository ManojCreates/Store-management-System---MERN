const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerDeliverySchema = new Schema({
    name:{
        type:String,//dataType
        required:true,//validate
    },
    contactNumber: {
        type: String, // dataType
        required: true, // Validation
    },
    email: {
        type: String, // dataType
        required: true, // Validation
    },
    address: {
        type: String, // dataType
        required: true, // Validation
    },
    glassType: {
        type: [String], // dataType
        required: true, // Validation
    },
    quantity: {
        type: Number, // dataType
        required: true, // Validation
    },
    specialInstructions: {
        type: String, // dataType
        required: true, // Validation
    },
    preferredDeliveryDate: {
        type: Date, // dataType
        required: true, // Validation
    }
});

module.exports = mongoose.model(
    "CustomerDeliveryModel",//file name
    customerDeliverySchema //functin name
)
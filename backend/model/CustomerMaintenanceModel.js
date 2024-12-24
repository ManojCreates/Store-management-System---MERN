const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerMaintenanceSchema = new Schema({
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
    serviceType: {
        type: String, // dataType
        required: true, // Validation
    },
    glassType: {
        type: [String], // dataType
        required: true, // Validation
    },
    dimensions: {
        type: String, // dataType
        required: true, // Validation
    },
    issueDescription: {
        type: String, // dataType
        required: true, // Validation
    },
    preferredServiceDate: {
        type: Date, // dataType
        required: true, // Validation
    }
});

module.exports = mongoose.model(
    "CustomerMaintenanceModel",//file name
    customerMaintenanceSchema //functin name
)
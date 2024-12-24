const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
    seqName: { type: String, required: true },
    seqValue: { type: Number, required: true }
});

// Use existing model if already created, otherwise create a new one
const Sequence = mongoose.models.Sequence || mongoose.model("Sequence", sequenceSchema);

const adminMaintenanceSchema = new Schema({
    requestid: {
        type: Number, // dataType
        unique: true, // Validation
    },
    name:{
        type:String,//dataType
        required:true,//validate
    },
    contactNumber: {
        type: String, // dataType
        required: true, // Validation
    },
    address: {
        type: String, // dataType
        required: true, // Validation
    },
    typeofservice: {
        type: String, // dataType
        required: true, // Validation
    },
    glasstype: {
        type: String, // dataType
        required: true, // Validation
    },
    size: {
        type: String, // dataType
        required: true, // Validation
    },
    issueDescription: {
        type: String, // dataType
        required: true, // Validation
    },
    requeststatus: {
        type: String, // dataType
        required: true, // Validation
    },
    assignedtechnician: {
        type: [String], // dataType
        required: true, // Validation
    },
    scheduleddate: {
        type: Date, // dataType
        required: true, // Validation
    }
});

adminMaintenanceSchema.pre("save", async function (next) {
    if (this.isNew) {
        const sequence = await Sequence.findOneAndUpdate(
            { seqName: "requestid" },  // Search by seqName instead of _id
            { $inc: { seqValue: 1 } },
            { new: true, upsert: true } // Upsert creates the document if it doesn't exist
        );
        this.requestid = sequence.seqValue;
    }
    next();
});

// Check if the model is already compiled before creating a new one
module.exports = mongoose.models.AdminMaintenanceModel || mongoose.model(
    "AdminMaintenanceModel", // Model name
    adminMaintenanceSchema // Schema name
);

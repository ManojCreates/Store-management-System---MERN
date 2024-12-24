const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
    seqName: { type: String, required: true },
    seqValue: { type: Number, required: true }
});

const Sequence = mongoose.model("Sequence", sequenceSchema);

const adminDeliverySchema = new Schema({
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
    glasstypeandsize: {
        type: String, // dataType
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
    deliverystatus: {
        type: String, // dataType
        required: true, // Validation
    },
    assigneddriver: {
        type: [String], // dataType
        required: true, // Validation
    },
    deliverydate: {
        type: Date, // dataType
        required: true, // Validation
    }
});

adminDeliverySchema.pre("save", async function (next) {
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

module.exports = mongoose.model(
    "AdminDeliveryModel",//file name
    adminDeliverySchema //functin name
)
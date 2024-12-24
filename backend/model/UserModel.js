const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    NIC: {
        type: String,  // You can specify length, pattern, or uniqueness here if needed
        required: true,
        unique: true   // Ensures each NIC is unique
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    CreatePassword: {
        type: String,
        required: true,
        unique: true
    },
    ConfirmPassword: {
        type: String,
        required: true,
        unique: true
    }
   

});

module.exports = mongoose.model('User', userSchema);

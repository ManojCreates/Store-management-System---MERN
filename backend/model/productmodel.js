const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    productname: {
        type: String,
        required: true,
    },
    
    productdescription: {
        type: String,
        required: true,
    },

    productinventory: {
        type: Number,
        required: true,
    },

    productprice: {
        type: String,
        required: true,
    },

    productsize: {
        type: String,
        required: true,
    },

  
    image: {
        type: String, 
        required: true,
    }
});

module.exports = mongoose.model("productmodel", productSchema);

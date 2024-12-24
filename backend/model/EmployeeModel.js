const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    firstName:{
        type:String,//dataType
        required:true,//validate
    }, 
    lastName:{
        type:String,//dataType
        required:true,//validate
    }, 
    employeeId:{
        type:String,//dataType
        required:true,//validate
    },    
    age:{
        type:Number,//dataType
        required:true,//validate
    },
    gender:{
        type:String,//dataType
        required:true,//validate
    }, 
    jobTitle:{
        type:String,//dataType
        required:true,//validate
    }, 
    department:{
        type:String,//dataType
        required:true,//validate
    },
    basicSal:{
        type:Number,//dataType
        required:true,//validate
    },

    
});

module.exports = mongoose.model(
    "EmployeeModel",//file name
    employeeSchema //functin name
)
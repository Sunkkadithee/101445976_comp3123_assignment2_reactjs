const mongoose = require("mongoose");


const employeeSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: String,
    password: String,
    position: String,
    salary: String,
    date_of_joining: {
        type: Date, 
        default: Date.now
    },
    department: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

});


const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee
const mongoose = require("mongoose");

const addadminscoll=mongoose.Schema(
    {
        name:{
            type: String
        },
        gender:{
            type: String
        },
        email:{
            type: String
        },
        otp: {
            type: String, // OTP will be stored as a string
            required: false, // OTP is optional
        }
    }
);


module.exports= mongoose.model('addadminscoll',addadminscoll)


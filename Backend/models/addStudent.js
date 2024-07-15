const mongoose = require("mongoose");

const addstudentcoll=mongoose.Schema(
    {
        name:{
            type: String
        },
        gender:{
            type: String
        },
        year:{
            type: Number
        },
        branch:{
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


module.exports= mongoose.model('addstudentcoll',addstudentcoll)


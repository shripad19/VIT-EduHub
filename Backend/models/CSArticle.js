// ENTC - Communication Systems
const mongoose = require("mongoose");

const CSarticlecoll = mongoose.Schema(
    {
        username:{
            type: String
        },
        blogtitle:{
            type: String
        },
        blogcontent:{
            type: String
        },
        password:{
            type: String
        },
        year:{
            type: String
        }
    }
);

module.exports= mongoose.model('CSarticlecoll',CSarticlecoll)
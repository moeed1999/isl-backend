const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true
    },
    reference : {
        type : String,
        required : true
    },
    inEnglish : {
        type : String,
        required : true
    },
    inUrdu : {
        type : String,
        required : true
    }

});

 const User = mongoose.model('easyChallenges' , easyChallenges);
 module.exports = User
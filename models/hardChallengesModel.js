const mongoose = require('mongoose');

const hardChallengesSchema = new mongoose.Schema({
    titleEng : {
        type: String,
        required : true
    },
    titleUrdu : {
        type: String,
        required : true
    },
    reference : {
        type: String,
        required : true
    },
    refUrdu : {
        type: String,
        required : true
    },
    refEnglish : {
        type: String,
        required : true
    },
});

 const hardChallenges = mongoose.model('hardChallenges' , hardChallengesSchema);
 module.exports = hardChallenges
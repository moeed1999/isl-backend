const mongoose = require('mongoose');

const easyChallengesSchema = new mongoose.Schema({
    titleEng: {
        type: String,
        required: true
    },
    titleUrdu: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true
    },
    refUrdu: {
        type: String,
        required: true
    },
    refEnglish: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

});

const easyChallenges = mongoose.model('easyChallenges', easyChallengesSchema);
module.exports = easyChallenges
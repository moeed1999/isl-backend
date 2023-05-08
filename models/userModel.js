const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    easyCompletedChallenges : {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'easyChallenges'
          }],
      },
    hardCompletedChallenges : {
        type: [{
          type: mongoose.Types.ObjectId,
          ref: 'hardChallenges'
        }],
      }

});

 const User = mongoose.model('users' , userSchema);
 module.exports = User
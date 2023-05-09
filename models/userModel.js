const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName : {
        type: String,
        required : true,
        unique : true,
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

userSchema.static('encryptPassword', function(password) {
    return bcrypt.hashSync(password , 10)
 });
 userSchema.static('comparePassword', function(password , hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
 });

 const User = mongoose.model('users' , userSchema);
 module.exports = User
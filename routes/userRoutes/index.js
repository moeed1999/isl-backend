const express = require('express');
const {userLogin,userSignUp,addChallengeInUser} = require('./apiFuncs/index')

const router = express.Router();

// login
router.get('/login',userLogin)

// sign up user
router.post('/signUp',userSignUp)

// add challenges in user
router.put('/addChallenge/:userId/:challengeId',addChallengeInUser)

module.exports = router;
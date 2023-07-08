const express = require('express');
const auth = require('../../middlewares/auth');
const {
    userLogin,
    userSignUp,
    addChallengeInUser,
    userEasyChallenges,
    userHardChallenges,
    clearAllChallenges
} = require('./apiFuncs/index')

const router = express.Router();

// login
router.get('/login', userLogin)

// sign up user
router.post('/signUp', userSignUp)

// add challenges in user
router.put('/addChallenge/:challengeId', auth(), addChallengeInUser)

// get all easy challenges of user
router.get('/allEasyChallenges', auth(), userEasyChallenges)

// get all hard challenges of user
router.get('/allHardChallenges', auth(), userHardChallenges)

// clear all challenges
router.put('/clearAllChallenges', auth(), clearAllChallenges)

module.exports = router;
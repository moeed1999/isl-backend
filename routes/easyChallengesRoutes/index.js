const express = require('express');
const auth = require('../../middlewares/auth');
const {allEasyChallenges, createEasyChallenge, getEasyChallenge,isEasyChallengeCompleted} = require('./apiFuncs/index')


const router = express.Router();

// get all easy challenges
router.get('/allChallenges',allEasyChallenges)

// create easy challenge
router.post('/createEasyChallenge',createEasyChallenge)

// get one easy challenge
router.get('/challenge',getEasyChallenge)

// check if challenge is completed or not
router.get('/isChallengeCompleted/:id',auth(),isEasyChallengeCompleted)
module.exports = router;
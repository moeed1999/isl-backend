const express = require('express');
const auth = require('../../middlewares/auth')
const { allHardChallenges, createHardChallenge, getHardChallenge,isHardChallengeCompleted } = require('./apiFuncs/index')


const router = express.Router();

// get all hard challenges
router.get('/allChallenges', allHardChallenges)

// create hard challenge
router.post('/createHardChallenge', createHardChallenge)

// get one hard challenge
router.get('/challenge', getHardChallenge)

// check if challenge is completed or not
router.get('/isChallengeCompleted/:id',auth(),isHardChallengeCompleted)

module.exports = router;
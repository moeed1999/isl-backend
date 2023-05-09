const express = require('express');
const {allHardChallenges, createHardChallenge, getHardChallenge} = require('./apiFuncs/index')


const router = express.Router();

// get all hard challenges
router.get('/allChallenges',allHardChallenges)

// create hard challenge
router.post('/createHardChallenge',createHardChallenge)

// get one hard challenge
router.get('/challenge/:userId',getHardChallenge)

module.exports = router;
const express = require('express');
const {allHardChallenges, createHardChallenge} = require('./apiFuncs/index')


const router = express.Router();

// get all easy challenges
router.get('/allChallenges',allHardChallenges)

// create easy challenge
router.post('/createHardChallenge',createHardChallenge)

module.exports = router;
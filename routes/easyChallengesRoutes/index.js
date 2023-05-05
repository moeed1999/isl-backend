const express = require('express');
const {allEasyChallenges, createEasyChallenge} = require('./apiFuncs/index')


const router = express.Router();

// get all easy challenges
router.get('/allChallenges',allEasyChallenges)

// create easy challenge
router.post('/createEasyChallenge',createEasyChallenge)

module.exports = router;
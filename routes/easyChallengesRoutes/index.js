const express = require('express');
const {allEasyChallenges, createEasyChallenge, getEasyChallenge} = require('./apiFuncs/index')


const router = express.Router();

// get all easy challenges
router.get('/allChallenges',allEasyChallenges)

// create easy challenge
router.post('/createEasyChallenge',createEasyChallenge)

// get one easy challenge
router.get('/challenge/:userId',getEasyChallenge)

module.exports = router;
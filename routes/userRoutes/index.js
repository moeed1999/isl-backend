const express = require('express');
const {userLogin,userSignUp} = require('./apiFuncs/index')

const router = express.Router();

// login
router.get('/login',userLogin)

// sign up user
router.post('/signUp',userSignUp)

module.exports = router;
const path = require('path');
require('dotenv').config({ path: '../.env' });
require('./connection')

const express = require('express');

const userRouter = require('../routes/userRoutes/index')
const easyChallengesRouter = require('../routes/easyChallengesRoutes/index')
const hardChallengesRouter = require('../routes/hardChallengesRoutes/index')

const app = express();

// app.use(express.json());

const PORT = process.env.PORT;

// const router = new express.Router();

app.use(express.json())

app.use('/user',userRouter)
app.use('/easy',easyChallengesRouter)
app.use('/hard',hardChallengesRouter)

app.listen(PORT , ()=>{
    console.log("Listening at port: " + PORT);
})


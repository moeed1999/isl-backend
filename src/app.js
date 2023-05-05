// require('dotenv').config();
require('./connection')

const express = require('express');


const userRouter = require('../routes/userRoutes/index')

const app = express();

// app.use(express.json());

const PORT = 9003 || process.env.PORT;

// const router = new express.Router();

app.use(express.json())

app.use('/user',userRouter)

app.listen(PORT , ()=>{
    console.log("Listening at port: " + PORT);
})


const path = require('path');
require('dotenv').config({ path: '../.env' });

const mongoose = require('mongoose');

// uncomment later
// mongoose.set('strictQuery' , true)
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log("Database is not connected");
})

const mongoose = require('mongoose');
require('dotenv').config();

// uncomment later
// mongoose.set('strictQuery' , true)
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/isl-backend").then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log("Database is not connected");
})
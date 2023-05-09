
const mongoose = require('mongoose');
require('dotenv').config();

// uncomment later
// mongoose.set('strictQuery' , true)
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL || "mongodb+srv://abdulmoeedcj:bzqvlwI2I4WJE8q4@cluster0.jtv8rxe.mongodb.net/").then(()=>{
    console.log("Database is connected");
}).catch((err)=>{
    console.log("Database is not connected");
})
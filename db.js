require('dotenv').config()
const mongoose = require('mongoose');
const path  = require('path');
const mongoURI = process.env.REACT_APP_NOT_MONGO_URI;
const connectToMongo = ()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongopo");
    })
}
module.exports = connectToMongo;
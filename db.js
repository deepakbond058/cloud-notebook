require('dotenv').config()
const mongoose = require('mongoose');
const path  = require('path');
const connectToMongo=()=>{
 mongoose.connect(
    process.env.REACT_APP_NOT_MONGO_URI,
    (err) => {
     if(err) console.log(err) 
     else console.log("mongdb is connected");
    });
}
module.exports = connectToMongo;
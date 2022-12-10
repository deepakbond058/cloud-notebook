const mongoose = require('mongoose');
require('dotenv').config()
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});
mongoose.connect(
  process.env.REACT_APP_NOT_MONGO_URI,
  (err) => {
   if(err) console.log(err) 
   else console.log("mongdb is connected");
});
const User= mongoose.model("user",UserSchema);
module.exports =User; 
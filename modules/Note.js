const mongoose = require('mongoose');
const connectToMongo = require('../db');
// import mongoose from 'mongoose';
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true,
  },
  tag:{
    type:String,
    default:"General"
  },
  date:{
    type:Date,
    default:Date.now
  }
});
connectToMongo();
const Note =  mongoose.model("note",NoteSchema);
module.exports = Note;
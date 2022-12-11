const mongoose = require('mongoose');
require('dotenv').config();
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
  // mongoose.connect(process.env.REACT_APP_NOT_MONGO_URI);
  const Note =  mongoose.model("note",NoteSchema);
  module.exports = Note;
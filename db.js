require('dotenv').config()
const mongoose = require('mongoose');
// const connectToMongo=()=>{
//  mongoose.connect(
//     process.env.REACT_APP_NOT_MONGO_URI,
//     (err) => {
//      if(err) console.log(err) 
//      else console.log("mongdb is connected");
//     });
// }

const connectToMongo = async () => {
    try {
      const conn = await mongoose.connect(process.env.REACT_APP_NOT_MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }
module.exports = connectToMongo;
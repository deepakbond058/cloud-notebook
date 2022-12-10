const connectToMongo = require("./db");
connectToMongo(); 
const express = require('express')
const cors = require('cors')
const app = express()
const PORT=5000 ;
const path = require("path");

app.use(express.json());
app.use(cors());

//Available imports
app.use("/api/auth",require("./routes/auth"));
app.use("/api/note",require("./routes/note"));

//Static files
app.use(express.static(path.join(__dirname,"./frontend/build")))
app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"./frontend/build/index.html"));
})
app.listen(PORT||process.env.PORT , () => {
  console.log(`http://localhost:${PORT}`)
})
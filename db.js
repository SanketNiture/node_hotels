
const mongoose = require("mongoose");

// set the MongoDB connection
var mongoDB="mongodb://127.0.0.1:27017/youtube-app-1";
 mongoose.connect(mongoDB)

//get the mangoose to use the global prmoise library
mongoose.Promise =global.Promise;

//mongodb default connection
var db = mongoose.connection;

db.on("connected",()=>{
  console.log(`Connected to Mongodb`)
})

db.on("disconnected",()=>{
  console.log(`Disconnected to Mongodb`)
})

db.on("error",(error)=>{
  console.log("Error occured in Mongodb",error)
})

module.exports=db;
const express = require("express");
const db = require("./db")
const app = express();
const fs = require("fs");
const port = 8000;
const menu = require("./menu")

const bodyParser = require("body-parser")
app.use(bodyParser.json()) //req.body

app.get("/menu/:VaryDishes",async(req,res)=>{
  try{
    const VaryDishes = req.params.VaryDishes;
    if(VaryDishes=="Palak Paneer" || VaryDishes=="Mutton Curry" || VaryDishes=="Mutton Biryani" ||
    VaryDishes=="Chicken Biryani"){
     const response = await menu.find({dishes:VaryDishes})
     console.log("respnse fetched");
     res.status(200).json(response)
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"})
  }
})




// import the router files
const personRoutes = require("./routes/PersonRoute");
const menuRoutes = require("./routes/MenuRoute")

//use the router
app.use("/person",personRoutes);
app.use("/menu",menuRoutes)

app.listen(port,()=>{
  console.log("connected to mongodb server")
})

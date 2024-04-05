const express = require("express");
const router = express.Router();
const menu = require("../menu")

router.post("/",async(req,res)=>{
  try{
    const data = req.body;

    //create new data off menu
     const newMenu = new menu(data)

    // save the data 
    const response = await newMenu.save()
    console.log("data saved");
  res.status(200).json(response)
  }catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"})
  }
})

router.get("/:VaryDishes",async(req,res)=>{
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

router.get("/",async(req,res)=>{
  try{
    const data =  await menu.find()
    console.log("data saved");
 res.status(200).json(data)
 }catch(error){
   console.log(error);
   res.status(500).json({error:"Internal server error"})
 }

})

router.put("/:id",async(req,res)=>{
  try{
const data = req.params.id;
const personUpdatedData = req.body;

const response = await menu.findByIdAndUpdate(data,personUpdatedData,{
 new:true,
 runValidators:true
})
if(!response){
  console.log("data not updated")
  res.status(404).json({error:"person not found"})
}
 console.log("data updated");
 res.status(200).json(response)
  }
  catch(error){
  console.log("data succesfuly deleted");
  res.status(400).json({error:"person not updated"})
  }
})

router.delete("/:id",async(req,res)=>{
  try{
    const data = req.params.id;
    const response = await menu.findByIdAndDelete(data)
    if(!response){
      console.log("data not updated")
      res.status(404).json({error:"person not found"})
    }
     console.log("data deleted successfuly");
     res.status(200).json(response)
      }
      catch(error){
      console.log("data succesfuly deleted");
      res.status(400).json({error:"person not deleted"})
      }
  
})
module.exports = router;
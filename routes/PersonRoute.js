const express = require("express");
const Person = require("../person")
const router = express.Router();


//get the method the person
router.get("/",async(req,res)=>{
  try{
     const data =  await Person.find()
     console.log("data saved");
  res.status(200).json(data)
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"})
  }
});

router.post("/",async(req,res)=>{
  try{
    const data = req.body;

  //create a new person document  using the mongoose model
  const newPerson = new Person(data);

  //save the new person to the database
  const response = await newPerson.save();
  console.log("data saved");
  res.status(200).json(response)
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal server error"})
  }
})

router.put("/:id",async(req,res)=>{
  try{
const data = req.params.id;
const personUpdatedData = req.body;

const response = await Person.findByIdAndUpdate(data,personUpdatedData,{
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
    const response = await Person.findByIdAndDelete(data)
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

module.exports = router
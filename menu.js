const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
 name:{
  type:String,
  ewquired:true,
 },
 Price:{
  type:Number,
  required:true,
 },
 branch:{
  type:Number,
  required:true,
 },
 dishes:{
  type:String,
  enum:["Chicken Biryani","Chicken Dum Biryani","Paneer Masala","Palak Paneer","Methi Palak","Egg Biryani","Sup","Fish Fry","Fish Curry","Chicken Curry","Mutton Curry","Mutton Biryani","Kaju curry"],
  required:true,
 },
 Taste:{
  type:String,
  enum:["sweet","sour","spicy","cold"],
  required:true,
 },
 ingredients:{
   type:String,
   default:0,
 },
 num_sales:{
  type:Number,
  default:1
 }
 
});

const MenuItem = mongoose.model("MenuItem",userSchema);
module.exports=MenuItem;

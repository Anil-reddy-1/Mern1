const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");


const dataSchema=mongoose.Schema({
id:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true,
},
body:{
    type:String,
    required:true
},
favorite:{
    type:Boolean,
    default:true
}
},{timeStamps:true})


const Data= mongoose.model("Data",dataSchema);

module.exports={Data}

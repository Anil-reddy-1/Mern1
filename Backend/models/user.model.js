const mongoose= require("mongoose");
const { timeStamp } = require("node:console");
const { type } = require("node:os");


const UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    
},{timeStamps:true})

const User = mongoose.model("User",UserSchema)

module.exports={User}
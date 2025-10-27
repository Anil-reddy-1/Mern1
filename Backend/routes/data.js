const express = require("express");
const {Data}=require("../models/data.model.js");
const { Authorization } = require("../middlewares/Authorization.js");
const { GetData, CreateData, UpdateData, DeleteData } = require("../controllers/DataControllers.js");
const route=express.Router();


route.get("/",Authorization,GetData)

route.post("/",Authorization,CreateData)

route.put("/",Authorization,UpdateData)

route.delete("/",Authorization,DeleteData)


module.exports=route;
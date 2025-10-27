const express = require("express")
const router = express.Router();
const { PostUser } = require("../controllers/UserControllers.js");
const {User}=require("../models/user.model.js")

router.post("/",PostUser);
router.get("/",async (req,res)=>{
    try {
        
        const data=await User.find({});
        res.json({data:data})
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

module.exports=router;


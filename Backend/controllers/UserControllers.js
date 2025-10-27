const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {User}=require("../models/user.model.js")

async function PostUser(req,res) {
     try {
        const {name,email,password}=req.body;
        const data=await User.findOne({email:email});
         
        if(data){
            if(name===data.name){
                if(await bcrypt.compare(password,data.password)){
                    const token = await jwt.sign({name:data.name,id:data._id},process.env.TOKEN_KEY);
                    return res.status(200).json({message:"user found",id:data._id,name:data.name,token:token})
                }               
                return res.status(400).json({message:"incorrect password "})
            }
 
            if(await bcrypt.compare(password,data.password)){
                const UserData = await User.updateOne({id:data._id},{name:name});
                const token = await jwt.sign({name:UserData.name,id:UserData._id},process.env.TOKEN_KEY);
                return res.status(200).json({message:"updated a  user name",name:UserData.name,id:UserData._id,token:token});
            }   
            return res.status(400).json({message:"incorrect password "})    
        }
                   
        const salt = await bcrypt.genSalt();
        const hashedpass=await bcrypt.hash(password,salt);
        const UserData = await User.create({name:name,email:email,password:hashedpass});
        const token = await jwt.sign({name:UserData.name,id:UserData._id},process.env.TOKEN_KEY);
        return  res.status(201).json({message:"Created a new user",name:UserData.name,id:UserData._id,token:token});

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
    
}

module.exports={PostUser}
const {Data} = require("../models/data.model.js");

async function GetData(req,res) {
    try {

        const data=await Data.find({id:req.user.id});
        res.status(200).json({message:"Successfully fetched data",data:data})
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

async function CreateData(req,res) {
    try {
        const time = new Date(Date.now()-60*1000)
        const count = await Data.countDocuments({id:req.user.id,createdAt:{$gte:time}})
        console.log(count);
        if(count>=5){
            res.status(429).json({message:"creation limit reached please try again later"})
            return;
        }
        const {title,body,favorite=false}=req.body;
        const data=await Data.create({id:req.user.id,title:title,body:body,favorite:favorite});
        res.status(200).json({message:"Created item successfully",data:data})
        
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}    
 
async function UpdateData(req,res) {
    try {
        const {title,body,favorite=false}=req.body;
        const updatedData = await Data.updateOne({id:req.user.id,_id:req.body.id},{title:title,body:body,favorite:favorite}) 
        res.status(200).json({message:"Updated successfully",data:updatedData});
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}

async function DeleteData(req,res) {
    try {
        const updatedData = await Data.deleteOne({id:req.user.id,_id:req.body.id}) 
        res.status(200).json({message:"Updated successfully",data:updatedData});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports={GetData,UpdateData,CreateData,DeleteData}
const jwt = require("jsonwebtoken");

async function Authorization(req,res,next){ 
    try{
       const auth= req.headers["authorization"];

       if(!auth) return res.status(401).json({message:"Unothorized access auth not provided"});

       const token=auth && auth.split(" ")[1];
       if(!token) return res.status(401).json({message:"Unothorized access no token"});

       await jwt.verify(token,process.env.TOKEN_KEY,(err,user)=>{
        if(err) return res.status(401).json({message:err.message})
        req.user=user;
        return next();
         })

    }catch(error){
        res.status(401).json({message:"Unothorized err access error",message:error.message})
    }
}

module.exports={Authorization}
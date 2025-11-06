require("dotenv").config()
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose")
const userRoute=require("./routes/user.js")
const dataRoute=require("./routes/data.js")

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://my-note-frontend-gamma.vercel.app'  
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept']
}));

app.use(express.json()); 
 
 app.use('/data',dataRoute);
 app.use("/user",userRoute);
app.get('/',(req,res)=>{
    res.status(200).json({message:"Notes Server"})
})
 


if (!process.env.DATABASE_URL) {
    console.error("DATABASE_URL is not defined");
    process.exit(1);
}


mongoose.connect(process.env.DATABASE_URL)
.then((res)=>{
    console.log("Conected to dataBase")
    app.listen(PORT,()=>{
    console.log("Listenting ... ")  
    })
})    
.catch( 
(err)=>{
    if(err){
        console.log("Db Conection failed");
        return;
    }
})




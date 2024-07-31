const express=require("express");
const User=require("./models/user");
const path=require("path");

const cors=require("cors");

require('dotenv').config();
require("./db");

const app=express();

app.use(cors());

app.use(express.json());

// app.use("/",(req,res)=>{
//     try {
//         res.status(200).json({message:"Welcome to user management!"});
//     } catch (error) {
//         res.status(500).jsonp({message:"Internal server error"});
//     }
// });

const userRoutes=require("./routes/userRoutes");

app.use("/user",userRoutes);


app.use(express.static(path.join(__dirname,'ClientUI/dist')));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,'ClientUI/dist/index.html')))

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("Listening to PORT :",PORT);
})

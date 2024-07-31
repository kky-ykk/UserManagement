const express=require("express");
const router=express.Router();
const User=require("../models/user");
const bcrypt=require("bcrypt");
const { jwtAuthMiddleware,generateToken } = require("../jwt");



//----------- storing record in db
router.post("/signup",async (req,res)=>{
    try {
        const datas=req.body;

        const user=new User(datas);

        const response=await user.save();

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({message:"Internal server error"});
    }
});


//---------------- login and gen generateToken
router.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;

        let user=await User.findOne({email:email});

        console.log("userfound :",user);

        if(!user)    return res.status(401).json({message:"wrong email"});

        const compareResult=await user.comparePassword(password);

        if(!compareResult)  return res.status(401).json({message:"wrong password"});
        else{

            const token=generateToken({id:user._id});
            
            
           return res.status(200).json({token:token,name:user.name});
        }

    } catch (error) {
        console.log(error);
        res.status(500).jsonp({message:"Internal server error"});
    }
});


//----------------- show  dbs datas
router.get("/getProfile",jwtAuthMiddleware,async (req,res)=>{
    try {
        const id=req.decoded.id;

        const user=await User.findById(id);

        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({message:"Internal server error"});
    }
});

router.put("/update",jwtAuthMiddleware,async (req,res)=>{
    try {
        const id=req.decoded.id;

        const newDatas=req.body;

        const response=await User.findOneAndUpdate( { _id: id },newDatas,{
            new:true,
            runValidators:true
        });

        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({message:"Internal server error"});
    }
});


module.exports=router;

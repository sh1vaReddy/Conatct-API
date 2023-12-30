const asynchandler=require("express-async-handler")
const user=require('../Model/usermodel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { json } = require("express")


exports.registerUser=asynchandler(async(req,res)=>{
    const {username,email,password}=req.body ;
    if(!username || !email || !password)
    {
        res.status(400);
        throw new Error("All fileds are mandatory") 
    }
    const userAvailable=await user.findOne({email});
    if(userAvailable)
    {
        res.status(400);
        throw new Error("email alredy is taken")
    }

     //hash password
     const hashpassword=await bcrypt.hash(password,10)
     console.log("hashpassword is",hashpassword)
     const newuser=await user.create({username,email,password:hashpassword})
      
     console.log(newuser)

     if(newuser)
     {
        res.status(201).json({_id:newuser.username,email:newuser.email})
     }

     else{
        res.status(400);
        throw new Error("user data is not vaild");
     }

    res.status(200).json("Sucessfully contact is created") 
})


exports.loginUser=asynchandler(async(req,res)=>
{

    const{email,password}=req.body;
    if(!email || !password)
    {
        res.status(400);
        throw new Error("All filed mandatory")
    }

    const User=await user.findOne({email});
    //compare password with hashpassowrd
    if(User && (await bcrypt.compare(password,user.password)))
    {
        const acessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN,
          {expiresIn:"10m"}
        )
        res.status(200).json({acessToken})
    }

    else{
        res.status(401)
        throw new Error("email and password is not vaild")
    }
})


exports.me=asynchandler(async(req,res)=>{
    res.status(200).json({ user: req.user, message: "Current user route" });
})
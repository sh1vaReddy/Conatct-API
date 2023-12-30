const express=require("express");
const { registerUser, loginUser, me } = require("../controllers/usercontrollers");
const router=express.Router();
const validtoken=require(`../middlerware/validtokenhandler`)



router.post("/register",registerUser)
 
router.post("/login",loginUser)

router.get("/me",validtoken,me)

module.exports =router;
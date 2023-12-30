const moongose=require("mongoose");

const userschema=moongose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email is alredy taken"]
    },
    password:{
        type:String,
        requires:[true,"password is required"],

    }
   
},
{
    timestamps:true,
})
module.exports=moongose.model("User",userschema)
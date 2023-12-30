const mongoose=require('mongoose')
const contactSchema=mongoose.Schema({
    user:{
        user_id:{
            type:mongoose.Schema.ObjectId,
            required:true,
            ref:"User"
        }
    },
    name:{
        type:String,
        required:[true,"plesase add name to conatct"]
        },
    email:{
        type:String,
        required:[true,"Enter your mail"]
    },
    phone:{
        type:Number,
        required:[true,"Enter your Phone number"]
    }
    
},
{
    timestamps:true
}
)

module.exports=mongoose.model("contact",contactSchema)
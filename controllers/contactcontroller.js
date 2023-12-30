 const asynchandlers=require('express-async-handler')
 const Contact=require('../Model/contactmodel')
 
 exports.getallcontacts=asynchandlers(async (req,res)=>{
    const contacts= await Contact.find({user_id:req.user.id})
   
    res.status(200).json(contacts)
});

exports.getcontacts=asynchandlers(async (req,res)=>

{
        const getsingleconnect=await Contact.findById(req.params.id)
        if(!getsingleconnect)
        {
            req.status(404).json({error:"Contact not found"})
            return;
            
        }
        res.status(200).json(getsingleconnect);
});


exports.createcontacts= asynchandlers(async (req,res)=>
{
    console.log(req.body)
    const {email,name,phone}=req.body;
    if(!name|| !email|| !phone)
    {
        res.status(400);
        throw new Error("All fileds are mandaatory")

    }

    const contact=await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    })

    res.status(200).json(contact)
})


exports.updatecontacts=asynchandlers(async (req,res)=>
{

    const contact=await Contact.findById(req.params.id)
    if(!contact)
    {
        req.status(404).json({error:"Contact not found"})
        return;
    }

    if(contact.user_id.toString() != req.user.id)
    {
        res.status(403);
        throw new Error("Usr not have presmisson to update other user contact")
    }
   const updatecontact=await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
   )

    res.status(200).json(updatecontact) 
})

exports.deletecontacts=asynchandlers(async (req,res)=>{
    const contact=await Contact.findById(req.params.id)
    if(!contact)
    {
        req.status(404).json({error:"Contact not found"})
        return;
    }

    if(contact.user_id.toString() != req.user.id)
    {
        res.status(403);
        throw new Error("Usr not have presmisson to delete other user contact")
    }

    await contact.deleteOne({_id:req.params.id})

    res.status(200).json({message:"Dleted contact"}) 
})
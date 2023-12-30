const express=require("express")
const {getallcontacts,createcontacts,getcontacts,updatecontacts,deletecontacts}=require('../controllers/contactcontroller')
const router=express.Router();
const validtoken=require(`../middlerware/validtokenhandler`)




router.use(validtoken)

router.route('/').get(getallcontacts);


router.route("/").post(createcontacts)

router.route('/:id').get(getcontacts)


router.route("/:id").put(updatecontacts)

router.route("/:id").delete(deletecontacts)

module.exports=router;
const express=require("express"); 
const { errorhandler } = require("./middlerware/errorhandler");
const { conectdb } = require("./config/database");

const dotenv=require("dotenv").config();     
const app=express();
const port=process.env.PORT || 5001

app.use(errorhandler)

conectdb();


app.use(express.json());

app.use("/api/v1/contacts",require('./routes/contactRoutes'));
app.use("/api/v1/users",require('./routes/userRoutes'));


app.listen(port,()=>{
    console.log(`server is running port ${port}`);
})

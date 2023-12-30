const mongoose=require('mongoose')
exports.conectdb= async () =>
{
    try{
        const connect=await mongoose.connect(process.env.CONNECTION_STIRNG);
        console.log("database is connected:",connect.connection.host,connect.connection.name)

    }
    catch(err){
        console.log(err)
        process.exit(1)

    }
}

    const asynchandler=require('express-async-handler');
    const jwt=require('jsonwebtoken');

    const validToken=asynchandler(async(req,res,next)=>{
        let token;
        let authheader=req.headers.Authorization || req.headers.authorization;
        if(authheader && authheader.startsWith("Bearer"))
        {
            token=authheader.split(" ")[1];
            jwt.verify(token,process.env.ACCESS_TOKEN,(err,decode)=>{
                if(err)
                {
                    res.status(401);
                    throw new Error("User is not authorization")
                }
                req.user=decode.user
                next();
            })
        }

    })


    module.exports = validToken;
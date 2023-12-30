const constants=require('../constants')
exports.errorhandler=(err,req,res,next)=>
{
  const statuscode=res.statuscode ? res.statuscode : 500;
  switch(statuscode)
  {
    case constants.VALIDATION_ERROR:
        {
          res.json({
            title:"Validation Error",
            message:err.message,
            stacktrace:err.stack
        })
      }

      case constants.NOT_FOUND:
        {
            res.json({
                title:"NOT FOUND",
                message:err.message,
                stacktrace:err.stack
            })
        }
        case constants.UNAUTHORIZED:
        {
            res.json({
                title:"UNAUTHORIZED",
                message:err.message,
                stacktrace:err.stack
            })
        }
        case constants.FORBIDDEN:
        {
            res.json({
                title:" FORBIDDEN",
                message:err.message,
                stacktrace:err.stack
            })
        }
        case constants.SERVER_ERROR:
            {

                res.json({
                    title:"SERVER_ERROR",
                    message:err.message,
                    stacktrace:err.stack
                })

            }
        default:
            console.log("NO ERROR,ALL GOOD!")
            break;

  }
  
 

};
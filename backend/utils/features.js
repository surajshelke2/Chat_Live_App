const jwt = require("jsonwebtoken");


const sendCokkies =async(user,res,message,statusCode)=>{

    const token = await jwt.signa({_id:user._id},process.env.JWTToken );


}
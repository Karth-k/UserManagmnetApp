const User = require("../model/user")
const jwt= require('jsonwebtoken')
const dotenv = require('dotenv')


dotenv.config()

const verify_token= async (req,res,next)=>{
    let token = req.header('Authorization')
    if(token){
        try{
            let payload =jwt.verify(token,process.env.JWT_secret)
            let user=await User.findById(payload.id)
            req.user=user
            next()
        }
        catch{
            res.send('Invalid Token')
        }

    }
    else{
        res.send('No Acess')
    }
}
module.exports=verify_token
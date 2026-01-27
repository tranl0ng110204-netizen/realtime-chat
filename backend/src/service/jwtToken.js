const jwt = require("jsonwebtoken")
const dotenv = require('dotenv')
dotenv.config()




const generateToken = (userID,res) =>{
    const token = jwt.sign({userID},process.env.JWTTOKEN,{
        expiresIn:'7d'
    })
    console.log("JWTTOKEN",token)
    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:true
    })
    return token
}

module.exports={
    generateToken
}


const jwt = require('jsonwebtoken')
const User  = require("../model/UserModel")

const authMiddleWare = async(req,res,next) =>{
    try{
        const token = req.cookies.jwt
        console.log('token :',token)
        if(!token){
            return res.status(401).json({
                message:"Unauthorized - No token provided"
            })
        }
        const decoded = jwt.verify(token,process.env.JWTTOKEN)
        if(!decoded){
            return res.status(401).json({
                message:"Unauthorized - No decoded"
            })
        }
        const user = await User.findById(decoded.userID).select("-password") //khong chon password
        if(!user){
            return res.status(401).json({
                message:"Khong ton tai user"
            })
        }
        req.user = user
 
        next()
    }
    catch(err){
        console.log('loi err',err)
        return res.status(500).json({
            message:"loi o authmiddleware",
            error:err
        })
    }
}

module.exports ={
    authMiddleWare
}
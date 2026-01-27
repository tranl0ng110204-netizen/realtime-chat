const User = require("../model/UserModel")
const {generateToken} = require("../service/jwtToken")
const bcryptjs = require('bcryptjs')
const cloudinary = require('../lib/cloudinary')

const SignUp = async(req,res) =>{
    const {fullName,email,password}  = req.body
    try{    
        if(!fullName || !email ||!password){
            return res.status(400).json({
                message:'thieu thong tin tao tk'
            })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Email không hợp lệ"
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                message:"do dai password phai lon hon 5"
            })
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"nguoi dung ton tai  trong db"
            })
        }
        const hashPassword = await bcryptjs.hash(password,10)
        
        const newUser = new User({
            email:email,
            password:hashPassword,
            fullName:fullName,
            createdAt: new Date()

        })

        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            return res.status(200).json({
                message:'tao nguoi dung thanh cong',
                _id :newUser._id,
                email:newUser.email,
                fullName:newUser.fullName,
                password:newUser.password
            })
        }else{
            return res.status(400).json({
                message:"loi data "
            })
        }
        
    }
    catch(err){
        console.log("Error khi tao tk nguoi dung : ",err)
        return res.status(500).json({
            message:" Loi o server khi tao Tk"
        })
    }
}


const LogIn = async(req,res) =>{
    const {email,password} = req.body
    console.log('req.body login',req.body)
    try{
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"nguoi dung khong ton tai trong db"
            })
        }
        const isCorrectPassword = await bcryptjs.compare(password , user.password)
        if(!isCorrectPassword){
            return res.status(400).json({
                message:" khong dung mat khau"
            })
       
        } 
        generateToken(user._id,res)
        return res.status(200).json({
            message:"login thanh cong",
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

    }
    catch(err){
        console.log('error khi login : ' ,err)
        return res.status(400).json({
            message:"loi khi login",
            errror:err
        })

    }
}
const LogOut = async(req,res) =>{
    try{
        res.cookie('jwt',"",{maxAge:0})
        return res.status(200).json({
            message:"logout thanh cong"
        })
    }
    catch(err){
         console.log('error khi login : ' ,err)
        return res.status(400).json({
            message:"loi khi logout",
            errror:err
        })

    }
}

const UpdateUser = async(req,res) =>{
   try{
    const {profilePic} = req.body
    const userID = req.user._id
    if(!profilePic){
        return res.stauts(400).json({
            message:"khong co profile pic de update"
        })
    }
    const upload = await cloudinary.uploader.upload(profilePic)
    const UpdateUser = await User.findByIdAndUpdate(
        userID,
        {
        profilePic:upload.secure_url
        },
        {
            new:true
        })
    return res.status(200).json({
        message:"update profilePic thanh cong"
    })

   }
   catch(err){
        console.log('loi khi update user',err)
        return res.status(400).json({
            message:"co loi xay ra khi update user",
        })
   }
    
    
}

module.exports = {
    SignUp,LogIn,LogOut,UpdateUser
}


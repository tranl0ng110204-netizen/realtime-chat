const express = require('express')
const route = express.Router()
const UserController = require("../controller/UserController")
const MiddleWare = require("../middleware/MiddleWare")

route.post("/sign-up",UserController.SignUp)
route.post("/log-in",UserController.LogIn)
route.post("/log-out",UserController.LogOut)
route.put("/update",MiddleWare.authMiddleWare,UserController.UpdateUser)

route.get("/check",MiddleWare.authMiddleWare,(req,res)=>{
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log('loi check auth')
        res.status(500).json({
            message:"Loi server"
        })
    }
})


module.exports = route


const Message = require("../model/MessageModel")
const User = require("../model/UserModel")
const cloudinary = require('../lib/cloudinary')

const GetUsersSideBar = async(req,res) =>{
    try{
        const LogedInUsers = req.user._id
        const filterUsers = await User.find({_id:{$ne : LogedInUsers}}).select("-password")
        return res.status(200).json({filterUsers})
    }
    catch(err){
        console.log('loi fetch User ',err)
        return res.status(400).json9(
            {message:"loi fetch users"}
        )
    }
}

const GetMessage = async(req,res) =>{
    try{
        const {id:userChatID} = req.params
        const userID = req.user._id

        const message = await  Message.find({
            $or:[
                {senderID :userID,receivedID :userChatID},
                {senderID :userChatID,receivedID :userID}
            ]
        })
        return res.status(200).json({message})
    }
    catch(err){
         console.log('loi fetch Message ',err)
        return res.status(400).json9(
            {message:"loi fetch Message"}
        )
    }
}

const SendMessage = async(req,res) =>{
    try{
        const {text,image} = req.body
        const {id: receivedID} = req.params
        const userID = req.user._id
        let imageUrl
        // upload anh sang cloudinary va luu duoi dang Url
        if(image){
            const upload = await cloudinary.uploader.upload(image)
            imageUrl = upload.secure_url
        }

        const newMessage = new Message({
            senderID:userID,
            receivedID:receivedID,
            text:text,
            image:imageUrl
        })
        await newMessage.save()
        return res.status(200).json({newMessage})
    }
    catch(err){
         console.log('loi send Message ',err)
        return res.status(400).json9(
            {message:"loi send message"}
        )
    }
}





module.exports = {
    GetUsersSideBar,
    GetMessage,
    SendMessage
}
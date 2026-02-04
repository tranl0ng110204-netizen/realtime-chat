const Message = require("../model/MessageModel")
const User = require("../model/UserModel")
const cloudinary = require('../lib/cloudinary')
const { getReceiveSocketID,io } = require('../lib/socket')


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
        const {text} = req.body
        const {id: receivedID} = req.params
        const userID = req.user._id
        let imageUrl
        // upload anh sang cloudinary va luu duoi dang Url
        if(req.file){
            const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
            const uploadResult = await cloudinary.uploader.upload(base64Image, {
                folder: "chat-images"
            })

            imageUrl = uploadResult.secure_url

        }

        const newMessage = new Message({
            senderID:userID.toString(),
            receivedID:receivedID.toString(),
            text:text,
            image:imageUrl
        })
        await newMessage.save()

        const receiverSocketID = getReceiveSocketID(receivedID)
        if(receiverSocketID){
            io.to(receiverSocketID).emit('newMessage',newMessage)
        }
     

        return res.status(200).json(newMessage)
    }
    catch(err){
         console.log('loi send Message ',err)
        return res.status(400).json(
            {message:"loi send message"}
        )
    }
}





module.exports = {
    GetUsersSideBar,
    GetMessage,
    SendMessage
}
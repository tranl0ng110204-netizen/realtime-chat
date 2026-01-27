const mongoose = require('mongoose')
const User = require("./UserModel")

const MessageSchema = new mongoose.Schema(
    {
        senderID:{type:mongoose.Schema.Types.ObjectId,ref:User,require:true},
        receivedID:{type:mongoose.Schema.Types.ObjectId,ref:User,require:true},
        text:{type:String},
        image:{type:String}
    },
    {
        timestamps:true
    })

const Message = mongoose.model("Message",MessageSchema)

module.exports = Message
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true,minlength:6},
    fullName:{type:String,require:true,default:"long"},
    profilePic:{type:String,default:'profile pic'}

},
{
    timestamps:true
})

const User = mongoose.model("User",userSchema)

module.exports = User
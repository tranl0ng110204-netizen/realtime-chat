const http = require('http')
const {Server}  = require('socket.io')
const express = require('express')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors:{
        origin:['http://localhost:5000']
    }
})


const getReceiveSocketID = (userID) =>{
    return userSocketMap[userID]
} 
// store online user
const userSocketMap = {} //{userID:socketId}

io.on("connection",(socket) =>{
    console.log('a user connected',socket.id)
    const userID = socket.handshake.query.userID
    if(userID){
        userSocketMap[userID] = socket.id
    }
    //send online user
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on('disconnect' ,() =>{
        console.log("a user disconnected", socket.id)
        delete userSocketMap[userID]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))

    })
})

module.exports = {
    io,app,server,getReceiveSocketID
}
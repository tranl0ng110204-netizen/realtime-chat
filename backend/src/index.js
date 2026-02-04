const express = require('express')
const AppRouter = require('./router/route')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cookieParser = require("cookie-parser")
const cors = require('cors')
const {app,server} = require('./lib/socket')
dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({origin:'http://localhost:5000',credentials:true}))

AppRouter(app)

server.listen(process.env.PORT,() =>{
    console.log("server run port:",process.env.PORT)
})

app.get("/",(req,res) =>{
   res.send('hello world')
})

mongoose.connect(`${process.env.MONGODB}`)
    .then(() =>{
        console.log(" mongodb server is connected")
    })
    .catch((err) =>{
    console.log('err',err)
})
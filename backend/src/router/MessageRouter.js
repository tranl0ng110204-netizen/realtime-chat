const experss = require('express')
const route = experss.Router()
const MiddleWare = require('../middleware/MiddleWare')
const MessageController = require('../controller/MessageController')

route.get("/user",MiddleWare.authMiddleWare,MessageController.GetUsersSideBar)
route.get("/:id",MiddleWare.authMiddleWare,MessageController.GetMessage)
route.post("/send/:id",MiddleWare.authMiddleWare,MessageController.SendMessage)


module.exports = route
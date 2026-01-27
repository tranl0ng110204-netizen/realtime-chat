const UserRouter = require('./UserRouter')
const MessageRouter = require('./MessageRouter')

const AppRouter = (app) =>{
    app.use("/api/user",UserRouter)
    app.use("/api/message",MessageRouter)

}

module.exports = AppRouter
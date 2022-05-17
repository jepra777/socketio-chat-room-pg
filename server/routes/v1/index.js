const v1 = require("express").Router()

const authentication = require("../../middleware/authentication")

const registerRouter = require("./registerRouter")
const loginRouter = require("./loginRouter")
const chatRouter = require("./chatRouter")

v1.get("/", (req, res) => {
    res.send("V1 API Chatroom integrate with Postgres as Database and Sequelize as ORM")
})

v1.use("/register", registerRouter)
v1.use("/login", loginRouter)
v1.use(authentication)
v1.use("/chat", chatRouter)

module.exports = v1
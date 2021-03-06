const v1 = require("express").Router()

const registerRouter = require("./registerRouter")
const loginRouter = require("./loginRouter")

v1.get("/", (req, res) => {
    res.send("V1 API Chatroom integrate with Postgres as Database and Sequelize as ORM")
})

v1.use("/register", registerRouter)
v1.use("/login", loginRouter)

module.exports = v1
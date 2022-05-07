const loginRouter = require("express").Router()
const {loginController} = require("../../controllers")

loginRouter.post("/", loginController.login)

module.exports = loginRouter
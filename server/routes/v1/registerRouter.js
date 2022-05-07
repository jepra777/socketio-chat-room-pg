const registerRouter = require("express").Router()
const {registerController} = require("../../controllers")

registerRouter.post("/", registerController.register)

module.exports = registerRouter
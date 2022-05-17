const chatRouter = require("express").Router()
const {chatController} = require("../../controllers")

chatRouter.get("/room", chatController.getRoom)
chatRouter.get("/name", chatController.getName)
chatRouter.get("/chat", chatController.getChats)
chatRouter.post("/chat", chatController.sendChat)
chatRouter.get("/rooms", chatController.getRoomLists)

module.exports = chatRouter
const { RoomLists } = require("../models")
const { User } = require("../models")
const { Chat } = require("../models")
const { hashPassword } = require("../helpers/passwordHandler")

class chatController {
  static getRoomLists = async (req, res) => {
      try {
          const rooms = await RoomLists.findAll({
            attributes: ['Room'],
            include: [
              {
                model: User,
                attributes: ['Username']
              }
            ]
          })
          res.status(201).json(rooms)
      } catch (err) {
          return res.status(500).json({message: err.message})
      }
    }

    static getRoom = async (req, res) => {
        try {
            const userId = req.user.id
            const room = await RoomLists.findOne({ 
                attributes: ['Room'],
                where: { UserId: userId } 
            })
            res.status(201).json(room)
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
    
    static async getName(req, res) {
        try {
          const userId = req.user.id
          const nama = await User.findOne({
            attributes: ['Username'],
            where:{
              id: userId
            }
          });
          res.status(201).json(nama);
        } catch (error) {
          throw error;
        }
      }
    
    static async getChats(req, res) {
       try {
         const userRoom = req.user.Room
         const chat = await Chat.findAll({
            where:{
              RoomId: userRoom
            },
            attributes: ['Chat'],
            include: [
              {
                model: User,
                attributes: ['Username']
              },
              {
                model: RoomLists,
                attributes: ['Room']
              }
            ]
         })
         res.status(201).json(chat)
       } catch (error) {
         throw error
       }
    }

   static async sendChat(req, res) {
      try {
        const { chatBox } = req.body
        
        const userId = req.user.id
        const userRoom = req.user.Room

        const payloadChat = {
            UserId:userId, RoomId:userRoom, Chat:chatBox
        }
        const chat = await Chat.create(payloadChat)
        
        if (chat) {
          return res.status(201).json({
            message: "Success",
            chat
          })
        } else if (!chat) {
          res.status(400).json({ message: "Bad Request" })
        }

    } catch (error) {
        return res.status(500).json({ message: error.message })
   }
  }
}

module.exports = chatController
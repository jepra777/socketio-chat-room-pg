const { User, RoomLists } = require("../models")
const { hashPassword } = require("../helpers/passwordHandler")

class registerController {
    static register = async (req, res) => {
        try {
            const { Username, Email, Password } = req.body
            
            const isEmailExist = await User.findOne({
                where: {
                    Email
                }
            })

            const isUsernameExist = await User.findOne({
                where: {
                    Username
                }
            })
            
            if (isEmailExist) return res.status(409).json({ message: "Email is already exist!" })

            if (isUsernameExist) return res.status(409).json({ message: "Username is already exist!"})
            
            const payloadUser = {
                Username: Username.toLowerCase(),
                Email: Email.toLowerCase(),
                Password: hashPassword(Password),
                Role: "user",
                Delete: false
            }

            const user = await User.create(payloadUser)

            if (user) {

                const payloadRoomLists = {
                    UserId: user.id,
                    Room: user.Username + "_admin"
                }

                const roomList = await RoomLists.create(payloadRoomLists)
                
                if (roomList) {
                    return res.status(201).json({ message: "Success to Create an Account!" })
                }
            } else if (!user) {
                return res.status(400).json({ message: "Bad Request" })
            }


        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    }
}

module.exports = registerController
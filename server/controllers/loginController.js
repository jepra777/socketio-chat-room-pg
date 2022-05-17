const { User, RoomLists } = require("../models")
const { verifyPassword } = require("../helpers/passwordHandler")
const { generateToken } = require("../helpers/tokenHandler")

class loginController {
    static login = async (req, res, next) => {
        try {
            let room = null;
            const { Username, Password } = req.body
            const user = await User.findOne({
                where: {
                Username: Username
                }
            })
            console.log(user.Role)
            const userRole = user.Role
            
            if ( userRole === "user"){
                room = await RoomLists.findOne({
                    where: {
                    UserId: user.id
                    }
                })
            }
            const isPasswordMatch = await verifyPassword(Password, user.Password)

            if (!isPasswordMatch) {
                return res.status(409).json({ message: "Wrong Password" })
            }

            const access_token = await generateToken({
                id: user.id,
                Email: user.Email,
                Role: user.Role,
                Room: room?.id
            })

            console.log(room?.id)

            res.cookie("access_token", access_token, {
                httpOnly: true
            })
            
            return res.status(200).json( { 
                id: user.id,
                Role: user.Role,
                Access_token: access_token,
                message: "Success"
            } )
        } catch (error) {
            return res.status(500).json( { message: error.message } )
        }
    }
}

module.exports = loginController
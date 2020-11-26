import bcrypt from "bcryptjs";
import cors from "@lib/cors";
import User from "@models/user"

const SALT = 10



export default async (req, res) => {
    cors(req, res)
    
    if (req.method === "GET") {
        (req, res) => {
            try {
                let users = await User.find().select("-password -__v")
                return res.json(users)
            } catch (error) {
                return res.status(400).json({
                    message: error
                })
            }
        }
    } else {
        if (req.method === "POST") {
            (req, res) => {
                const {
                    name,
                    email,
                    password
                } = req.body;
    
                const emailExists = await User.findOne({
                    email: email
                })
    
                if (emailExists) {
                    return res.status(401).json({
                        message: "User already registered."
                    })
                }
    
                const hashedPassword = await bcrypt.hash(password, SALT)
    
                const user = new User({
                    email: email,
                    name: name,
                    password: hashedPassword,
                })
                try {
                    await user.save()
                    return res.status(200).json({
                        message: "Successfully registered."
                    })
                } catch (error) {
                    return res.status(400).json({
                        message: error.message
                    })
                }
            }
        }
    }

}
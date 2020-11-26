import jwt from "jsonwebtoken";
import cors from "@lib/cors";
import User from "@models/user"
import config from "@config/env"
import bcrypt from "bcryptjs";


export default async (req, res) => {
    cors(req, res)
    if (req.method === "DELETE") {
        (req, res) => {
            try {
                const user = req.profile
                let deletedUser = await user.remove()
                deletedUser.password = undefined
                return res.json(deletedUser)
            } catch (error) {
                return res.status(400).json({
                    message: error
                })
            }
        }
    } else {
        cors(req, res)
        if (req.method === "GET") {
            (req, res) => {
                const token = req.header("x-auth-token")
                const verified = jwt.verify(token, config.jwtSecret);
                try {
                    let user = await User.findById(verified._id).select("-password -__v")
                    if (user) {
                        return res.json({
                            user: user
                        })
                    }
                } catch (error) {
                    return res.status(400).json({
                        message: error
                    })
                }
            }
        } else {
            cors(req, res)
            if (req.method === "PATCH") {
                (req, res) => {
                    try {
                        const {
                            user
                        } = req.body
                        let newPassword = user.password
                        const newHashedPassword = await bcrypt.hash(newPassword, SALT)

                        let updatedUser = await User.findOneAndUpdate({
                            _id: user._id
                        }, {
                            instructor: user.instructor,
                            email: user.email ? user.email : undefined,
                            name: user.name ? user.name : undefined,
                            password: user.password ? newHashedPassword : undefined,
                            updated: Date.now(),
                        }, {
                            new: true,
                            omitUndefined: true,
                        })

                        return res.json({
                            user: {
                                created: updatedUser.created,
                                instructor: updatedUser.instructor,
                                email: updatedUser.email,
                                _id: updatedUser._id,
                                name: updatedUser.name,
                            }
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
}
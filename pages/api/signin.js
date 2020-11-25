import Cors from "cors"
import initMiddleware from "@lib/initMiddleware"
import {SALT} from "@lib/utils"
import bcrypt from "bcryptjs"

import dotenv from "dotenv"

import {
    SALT
} from "../serverUtils/index.js"
import jwt from "jsonwebtoken";


const cors = initMiddleware(Cors({
  methods: ["GET", "POST", "PATCH", "PUT", "OPTIONS"],
}))



const handleMW = async (req, res) => {
  await cors(req, res)

  const {
    email,
    password
} = req.body
try {
    let user = await User.findOne({
        email: email,
    });

    if (!user) {
        return res.status(401).json({
            error: "User not found.",
        });
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(401).json({
            error: "Invalid Email or password.",
        });
    } else {
        const token = jwt.sign({
                _id: user.id
            },
            process.env.JWT_SECRET,
        )

        return res.json({
            token,
            user: {
                created: user.created,
                instructor: user.instructor,
                email: user.email,
                _id: user._id,
                name: user.name,
            }
        });
    }

} catch (error) {
    return res.status(401).json({
        error: error.message
    });
}

}
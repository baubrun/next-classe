import User from "@models/user"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT = 10


const read = (req, res) => {
    req.profile.password = undefined
    req.profile.__v = undefined
    return res.json(req.profile)
}


const create = async (req, res) => {
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
            error: "User already registered."
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
            error: error.message
        })
    }
}



const list = async (req, res) => {
    try {
        let users = await User.find().select("-password -__v")
        return res.json(users)
    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}


const remove = (req, res) => {
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


const userByID = async (req, res, next, id) => {
    try {
      let user = await User.findById(id)
      if (!user)
        return res.status(400).json({
          error: "User not found.absolute"
        })
      req.profile = user
      next()
    } catch (err) {
      return res.status(400).json({
        error: "Could not retrieve user.absolute"
      })
    }
  }
  

const update = (req, res) => {
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


export default {
    create,
    userByID,
    read,
    list,
    remove,
    update,
    // isEducator
  }
  
import User from "@models/user"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SALT = 10



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

const isInstructor = (req, res, next) => {
    const isInstructor =
        req.course &&
        req.auth &&
        req.course.instructor._id == req.auth._id
    if (!isInstructor) {
        return res.status(403).json({
            error: "User is not authorized."
        })
    }
    next()
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

const read = async (req, res,) => {
    try {
      let user = await User.findById(req.query.userId).select("-password -__v")
      if (!user)
        return res.status(400).json({
          error: "User not found."
        })
      return res.status(200).json(user)
    } catch (error) {
      return res.status(400).json({
        error: error.message
      })
    }
  }



const remove = async (req, res) => {
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


const signIn = async (req, res) => {
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
};



  

const update = async (req, res) => {
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
    isInstructor,
    list,
    read,
    remove,
    signIn,
    // userByID,
    update,
  }
  
// import jwt from "jsonwebtoken";
import cors from "@lib/cors";
// import User from "@models/user"
// import config from "@config/env"
// import bcrypt from "bcryptjs";
// import auth from "helpers/fetch/auth"
// import expressJwt from "@lib/expressJwt";
import nc from 'next-connect';
import userController from "@ctrl/userController"


const onError = (err, req, res, next) => {

    res.status(500).end(err.toString());
    next()
}

export default nc({
        onError
    })
    .use(cors())
    .delete(
        // authController.hasAuthorization,
        // authController.hasAuthorization,
        userController.remove
    )
    .get(
        // authController.reqSignIn,
        userController.read
    )
    .patch(
        // authController.reqSignIn,
        // authController.hasAuthorization,
        userController.update,
    )










// }import jwt from "jsonwebtoken";
// import cors from "@lib/cors";
// import User from "@models/user"
// import config from "@config/env"
// import bcrypt from "bcryptjs";
// import auth from "@api/auth"
// import expressJwt from "@lib/expressJwt";


// export default async (req, res) => {
//     cors(req, res)
//     if (req.method === "DELETE") {
//             try {
//                 const user = req.profile
//                 let deletedUser = await user.remove()
//                 deletedUser.password = undefined
//                 return res.json(deletedUser)
//             } catch (error) {
//                 return res.status(400).json({
//                     message: error
//                 })
//             }
//     } else {
//         cors(req, res)

//         if (req.method === "GET") {
//             //     try {
//             //         const {authorization} = req.headers
//             //         const token = authorization.replace(/^Bearer\s+/, "");
//             //         const verified = jwt.verify(token, config.jwtSecret);

//             //         let user = await User.findById(verified._id).select("-password -__v")
//             //         if (user) {
//             //             console.log('-- GOT user:>>', user._id)
//             //             return res.json({
//             //                 user: user
//             //             })
//             //         }
//             //     } catch (error) {
//             //         return res.status(400).json({
//             //             message: error.message
//             //         })
//             // }
//             try {
//                 let user = await User.findById(id)
//                 if (!user)
//                   return res.status(400).json({
//                     error: "User not found."
//                   })
//                 req.profile = user
//                 next()
//               } catch (err) {
//                 return res.status(400).json({
//                   error: "Could not retrieve user."
//                 })
//               }

//         } else {
//             cors(req, res)
//             if (req.method === "PATCH") {
//                     try {
//                         const {
//                             user
//                         } = req.body
//                         let newPassword = user.password
//                         const newHashedPassword = await bcrypt.hash(newPassword, SALT)

//                         let updatedUser = await User.findOneAndUpdate({
//                             _id: user._id
//                         }, {
//                             instructor: user.instructor,
//                             email: user.email ? user.email : undefined,
//                             name: user.name ? user.name : undefined,
//                             password: user.password ? newHashedPassword : undefined,
//                             updated: Date.now(),
//                         }, {
//                             new: true,
//                             omitUndefined: true,
//                         })

//                         return res.json({
//                             user: {
//                                 created: updatedUser.created,
//                                 instructor: updatedUser.instructor,
//                                 email: updatedUser.email,
//                                 _id: updatedUser._id,
//                                 name: updatedUser.name,
//                             }
//                         })
//                     } catch (error) {
//                         return res.status(400).json({
//                             message: error.message
//                         })
//                     }
//                 }
//             }
//     }
// }
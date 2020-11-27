import cors from "cors"
import nc from 'next-connect';
import userController from "@ctrl/userController"


const onError = (error, req, res, next) => {
    if (error){
        return  res.status(500).json(error.toString());
      } 
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
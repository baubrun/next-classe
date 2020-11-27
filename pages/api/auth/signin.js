import cors from "cors"

import nc from 'next-connect';
import userController from "@ctrl/userController"


const onError = (error, req, res, next) => {

    if (error){
         res.status(500).json(error.toString());
         return
      } 
      next()
  }

export default nc({
        onError
    })
    .use(cors())
    .post(
        userController.signIn,
    )











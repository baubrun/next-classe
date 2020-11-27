
import cors from "cors"
import nc from 'next-connect';
import courseController from "@ctrl/courseController"


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
    .get(courseController.read)
    // .put(
    // //     // authController.reqSignIn,
    // //     // userController.isInstructor,
    //     courseController.update,
    // )

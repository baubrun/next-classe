// import authController from "@ctrl/authController";
import courseController from "@ctrl/courseController";
// import userController from "@ctrl/userController";
import nc from "next-connect"
import cors from "cors"



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
    .get(courseController.listByInstructor)
    .post(
        courseController.create,
    )




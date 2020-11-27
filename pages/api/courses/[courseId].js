
import cors from "cors"
import nc from 'next-connect';
import courseController from "@ctrl/courseController"


const onError = (err, req, res, next) => {

    res.status(500).end(err.toString());
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

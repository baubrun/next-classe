import authController from "@ctrl/authController";
import courseController from "@ctrl/courseController";
import userController from "@ctrl/userController";


import {
    upload
} from "../serverUtils/index.js"

const router = express.Router()


router.route("/api/courses/by/:userId")
    .get(
        // authController.reqSignIn,
        // authController.hasAuthorization,
        courseController.listByInstructor
    )
    .post(
        upload.any(),
        // authController.hasAuthorization,
        // userController.isInstructor,
        courseController.create,
    )


router.route("/api/courses/:courseId")
    .get(courseController.read)
    // .put(
    // //     // authController.reqSignIn,
    // //     // userController.isInstructor,
    //     courseController.update,
    // )


router.route("/api/courses/:courseId/lesson/new")
    .put(
        // authController.reqSignIn,
        // userController.isInstructor,
        courseController.newLesson,
    )
\\
export default router
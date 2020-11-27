// import authController from "@ctrl/authController";
import courseController from "@ctrl/courseController";
// import userController from "@ctrl/userController";


import {
    upload
} from "@lib/multer"

const router = express.Router()


router.route("/api/courses/by/:userId")
    .get(
        courseController.listByInstructor
    )
    .post(
        upload.any(),
        courseController.create,
    )


router.route("/api/courses/:courseId")
    .get(courseController.read)
    // .put(
    //     courseController.update,
    // )


router.route("/api/courses/:courseId/lesson/new")
    .put(
        // authController.reqSignIn,
        // userController.isInstructor,
        courseController.newLesson,
    )

export default router
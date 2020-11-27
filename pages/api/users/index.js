import cors from "cors"
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
    .get(userController.list)
    .post(userController.create);
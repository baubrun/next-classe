import initMiddleware from "helpers/fetch/initMiddleware"
import expressJwt from 'express-jwt'
import config from "@config/env"

const requireSignIn = initMiddleware(expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
  }))
  

export default requireSignIn
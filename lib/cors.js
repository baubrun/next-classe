import Cors from "cors"
import initMiddleware from "@lib/initMiddleware"

const cors = initMiddleware(Cors({
    methods: ["GET", "POST", "PATCH", "PUT", "OPTIONS"],
  }))
  
  
  

export default cors
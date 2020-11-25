import Cors from "cors"
import initMiddleware from "@api/initMiddleware"

const cors = initMiddleware(Cors({
    methods: ["GET", "POST", "PATCH", "PUT", "OPTIONS"],
  }))
  
  
  

export default cors
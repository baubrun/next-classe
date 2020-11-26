/* This is a database connection function*/
import mongoose from "mongoose"
import config from "@config/env"
const connection = {} 



const  dbConnect = async () => {
  if (connection.isConnected) {
    return 
  }

  const db = await mongoose.connect(config.mongoUri, {
      dbName: "Classroom",
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

  connection.isConnected = db.connections[0].readyState
  return connection
}

export default dbConnect
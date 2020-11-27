import mongoose from "mongoose"
import config from "@config/env"
const connection = {}



const dbConnect = async () => {

  try {
    if (connection.isConnected) {
      return true
    }

    const db = await mongoose.connect(config.mongoUri, {
      dbName: "Classroom",
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })

    connection.isConnected = db.connections[0].readyState
    return connection.isConnected === 1

  } catch (error) {
    return {
      error: error.message
    }
  }
}
export default dbConnect





// const  dbConnect = async () => {

//   if (connection.isConnected) {
//     return 
//   }

//   const db = await mongoose.connect(config.mongoUri, {
//       dbName: "Classroom",
//       useCreateIndex: true,
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useFindAndModify: false,
//     })

//   connection.isConnected = db.connections[0].readyState
//   return connection
// }

// export default dbConnect
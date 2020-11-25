  const initMiddleware = (middleware) => {
    return (req, res) => {
      new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result)
          } else {
            return resolve(result)
          }
        })
      })
    }
  }


  export default initMiddleware
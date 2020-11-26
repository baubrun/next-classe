import cors from "@lib/cors";


export default async (req, res) => {
    cors(req, res)
    if (req.method === "GET") {
        try {
            let courses = await Course.find().select("-__v")
            return res.json(courses)
        } catch (error) {
            return res.status(400).json({
                message: error.message
            })
        }
    } else {
        if (req.method === "POST"){
           (req, res) => {
                const {
                    // files,
                    body: {
                        name,
                        description,
                        category,
                        published,
                    }
                } = req
            
            
                const courseExists = await Course.findOne({
                    name: name,
                })
            
                if (courseExists) {
                    return res.status(403).json({
                        message: "Course already exists."
                    })
                }
            
                // if (!files){
                //     return res.status(400).json({
                //         message: "File required. "
                //     })
                // }
            
                // const file = files.file
                // file.mv()
            
                // const course = new Course()
                // course.category = category
                // course.description = description
                // course.image.data = fs.readFileSync(file.path)
                // course.image.contentType = file.detectedMimeType
                // course.name = name
                // course.published = published
            
                const course = new Course({
                    name: name,
                    image: image,
                    description: description,
                    category: category,
                    published: published,
                })
            
                try {
                    await course.save()
                    return res.status(200).json({
                        message: "Course is successfully registered."
                    })
                } catch (error) {
                    return res.status(400).json({
                        message: error.message
                    })
                }
               
            }
        }
    }

}
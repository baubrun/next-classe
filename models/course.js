import mongoose from "mongoose"
import LessonSchema from "./lesson.js"




const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Name is required."
  },
  image: {
    type: String,
    required: "Image is required."

  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: "Category is required."
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  instructor: {type: mongoose.Schema.ObjectId, ref: "User"},
  published: {
    type: Boolean,
    default: false
  },
  lessons: [LessonSchema]
})

export default mongoose.models.Course || mongoose.model("Course", CourseSchema)

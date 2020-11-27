import mongoose from "mongoose";
import Course from "@models/course";
import onFinished from "on-finished";
import { moveFilesToApp } from "@lib/multer";
import path from "path";

const courseByID = async (req, res,) => {
  const id = req.query.courseId
  try {
    let course = await Course
    .findById(id)
    .populate("instructor", "_id name")
    if (!course)
      return res.status(400).json({
        error: "Course not found."
      })
      return res.status(200).json(course)
  } catch (error) {
    return res.status(400).json({
      error: error.message
    })
  }
};

const create = async (req, res, next) => {
  const {
    files,
    body: { name, description, category, instructor, published },
  } = req;

  const courseExists = await Course.findOne({
    name: name,
  });

  if (courseExists) {
    return res.status(401).json({
      message: "Course already exists.",
    });
  }

  try {
    let file = files[0];
    if (files.length < 1) {
      return res.status(400).json({
        message: "Image required.",
      });
    } else {
      const ext = path.extname(file.originalname);
      if (![".jpeg", ".jpg", ".png"].some((x) => x === ext)) {
        return res.status(400).json({
          message: "Invalid image type.",
        });
      }
    }

    const course = new Course({
      name: name,
      image: file.filename,
      instructor: mongoose.Types.ObjectId(instructor),
      // instructor: valid_OId(instructor),
      description: description,
      category: category,
      published: published,
    });

    await course.save();

    res.status(200).json({
      name: course.name,
      image: file.originalname,
      instructor: course.instructor,
      description: course.description,
      category: course.category,
      published: course.published,
    });

    onFinished(res, (error) => {
      if (error) {
        return res.status(400).json({
          message: error.message,
        });
      } else {
        moveFilesToApp();
      }
      return;
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const courseByInstructor = async (req, res) => {
  try {
    const courses = await Course.find({
      instructor: req.query.userId,
    }).populate("instructor", "_id name");

    return res.status(200).json(courses);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const newLesson = async (req, res) => {
  try {
    let lesson = req.body.lesson;
    let newLesson = await Course.findByIdAndUpdate(
      req.course._id,
      {
        $push: {
          lessons: lesson,
        },
        updated: Date.now(),
      },
      {
        new: true,
      }
    )
      .populate("instructor", "_id name")
      .exec();
    return res.status(200).json(newLesson);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const read = async (req, res) => {
  console.log("in read courses");
  // try {
    let course = await Course.findById(req.query.courseId).populate("instructor", "_id name");
    // let course = await Course.findById(mongoose.Types.ObjectId(req.query.courseId))
  //   if (!course)
  //     return res.status(400).json({
  //       error: "Course not found.",
  //     });
  //   return res.status(200).json(course);
  // } catch (error) {
  //   return res.status(400).json({
  //     error: error.message,
  //   });
  console.log("course :>> ", course);
  // }

  // res.json({
  //   req: valid_OId(req.query.courseId),
  //   type: typeof valid_OId(req.query.courseId)
  // })
};

export default {
  create,
  courseByID,
  courseByInstructor,
  newLesson,
  read,
};

import express from "express";
import {
  addLectures,
  createCourse,
  deleteCourse,
  deleteLecture,
  getAllCourses,
  getLectures,
} from "../controllers/courseController.js";
import {
  authorizeAdmin,
  isAuthenticated,
  authorizeSubscribers,
} from "../middlewares/Auth.js";
import singleUpload from "../middlewares/multer.js";

const router = express.Router();

//get all courses without lectures

router.route("/courses").get(getAllCourses);

// create new courses - only admin
router
  .route("/createcourse")
  .post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

//add lecture , delete  course, get course details

router
  .route("/courses/:id")
  .get(isAuthenticated, authorizeSubscribers, getLectures)
  .post(isAuthenticated, authorizeAdmin, singleUpload, addLectures)
  .delete(isAuthenticated, authorizeAdmin, deleteCourse);

// delete lectures

router.route("/lecture").delete(isAuthenticated, authorizeAdmin, deleteLecture);

export default router;

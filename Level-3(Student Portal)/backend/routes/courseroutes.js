import express from "express";

import {
getCourses,
addCourse,
} from "../controllers/courseController.js";

import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
router.get(
"/",
authMiddleware,
getCourses
);

// ADD NEW COURSE
router.post(
"/",
authMiddleware,
addCourse
);
export default router;
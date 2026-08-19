import Course from "../models/Course.js";

// GET ALL COURSES

export const getCourses = async (req, res) => {
try {
const courses = await Course.find().sort({
createdAt: -1,
});

res.status(200).json({
message: "Courses fetched successfully",
courses,
});
} catch (error) {
console.error(
"Get Courses Error:",
error.message
);

res.status(500).json({
message: "Failed to get courses",
error: error.message,
});
}
};

// ADD NEW COURSE

export const addCourse = async (req, res) => {
try {
const {
title,
description,
instructor,
duration,
level,
icon,
} = req.body;

if (
!title ||
!description ||
!instructor ||
!duration
) {
return res.status(400).json({
message:
"Title, description, instructor and duration are required",
});
}

// Create course

const course = await Course.create({
title: title.trim(),
description: description.trim(),
instructor: instructor.trim(),
duration: duration.trim(),
level: level || "Beginner",
icon: icon || "📚",
});

res.status(201).json({
message: "Course added successfully ✅",
course,
});
} catch (error) {
console.error(
"Add Course Error:",
error.message
);

res.status(500).json({
message: "Failed to add course",
error: error.message,
});
}
};
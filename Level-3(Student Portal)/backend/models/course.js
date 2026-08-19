import mongoose from "mongoose";

// COURSE SCHEMA
const courseSchema = new mongoose.Schema(
{

// Course Title
title: {
type: String,
required: true,
trim: true,
},

// Course Description
    
description: {
type: String,
required: true,
trim: true,
},

// Instructor Name
instructor: {
type: String,
required: true,
trim: true,
},

// Course Duration
duration: {
type: String,
required: true,
trim: true,
},

// Course Level
level: {
type: String,
default: "Beginner",
trim: true,
},

// Course Icon
icon: {
type: String,
default: "📚",
},
},
{
timestamps: true,
}
);

// COURSE MODEL
const Course = mongoose.model(
"Course",
courseSchema
);
export default Course;
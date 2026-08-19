import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCourse() {
const navigate = useNavigate();
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [instructor, setInstructor] = useState("");
const [duration, setDuration] = useState("");
const [level, setLevel] = useState("Beginner");
const [icon, setIcon] = useState("📚");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [loading, setLoading] = useState(false);

// ADD COURSE
  
const handleSubmit = async (e) => {
e.preventDefault();
setMessage("");
setError("");
setLoading(true);
try {
const token = localStorage.getItem("token");
if (!token) {
setError("Please login first.");
setLoading(false);
return;
}
const response = await fetch(
"http://localhost:5000/api/courses",
{
method: "POST",
headers: {
"Content-Type": "application/json",
Authorization: `Bearer ${token}`,
},
body: JSON.stringify({
title,
description,
instructor,
duration,
level,
icon,
}),
}
);

const data = await response.json();
if (!response.ok) {
setError(
data.message || "Failed to add course"
);
setLoading(false);
return;
}
setMessage(
data.message ||"Course added successfully ✅"
);

// Clear form
    
setTitle("");
setDescription("");
setInstructor("");
setDuration("");
setLevel("Beginner");
setIcon("📚");
setLoading(false);
} catch (error) {
console.error(
"Add Course Error:",
error
);
setError(
"Unable to connect to server."
);
setLoading(false);
}
};
return (
<section className="auth-section">
<div className="auth-card">

{/* Header */}
<button type="button"className="back-btn"onClick={() =>
navigate("/courses")}>← Courses</button>
<h2>Add New Course</h2>
<p className="subtitle">Add a new course to the Student Portal</p>

{/* Success */}

{message && (
<p className="success-message">{message}</p>
)}

{/* Error */}

{error && (
<p className="error-message">{error}</p>
)}
<form onSubmit={handleSubmit}>

{/* Title */}

<div className="form-group">
<label>Course Title</label>
<input type="text"placeholder="Enter course title"
value={title}onChange={(e) =>setTitle(e.target.value)}required/>
</div>

{/* Description */}

<div className="form-group">
<label>Description</label>
<textarea placeholder="Enter course description"
value={description}onChange={(e) =>setDescription(
e.target.value)}rows="4"required/>
</div>

{/* Instructor */}

<div className="form-group">
<label>Instructor</label>
<input type="text"placeholder="Enter instructor name"value={instructor}onChange={(e) =>
setInstructor(e.target.value)}required/>
</div>

{/* Duration */}

<div className="form-group">
<label>Duration</label>
<input type="text"placeholder="Example: 12 Weeks"
value={duration}onChange={(e) =>setDuration(
e.target.value)}required/>
</div>

{/* Level */}

<div className="form-group">
<label>Level</label>
<select value={level}onChange={(e) =>setLevel(
e.target.value)}>
<option value="Beginner">Beginner</option>
<option value="Intermediate">Intermediate</option>
<option value="Advanced">Advanced</option>
</select>
</div>

{/* Icon */}

<div className="form-group">
<label>Course Icon</label>
<select value={icon}onChange={(e) =>setIcon(
e.target.value)}><option value="📚">📚 General
</option>
<option value="💻">💻 Web Development</option>
<option value="🗄️">🗄️ Database</option>
<option value="🌳">🌳 Data Structures</option>
<option value="🌐">🌐 Networking</option>
<option value="⚛️">⚛️ React</option>
<option value="🐍">🐍 Python</option>
</select>
</div>

{/* Submit */}

<button type="submit"className="primary-btn"disabled={loading}>{loading? "Adding Course...": "Add Course"}</button>
</form>
</div>
</section>
);
}
export default AddCourse;
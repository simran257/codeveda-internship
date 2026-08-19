import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
const navigate = useNavigate();
const [courses, setCourses] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// FETCH COURSES
  
const fetchCourses = async () => {
setLoading(true);
setError("");
try {
const token = localStorage.getItem("token");

// Check login
if (!token) {
navigate("/login");
return;
}
const response = await fetch(
"http://localhost:5000/api/courses",
{
method: "GET",
headers: {
Authorization: `Bearer ${token}`,
"Content-Type": "application/json",
},
}
);
const data = await response.json();
console.log("Courses API Response:", data);

// Authentication expired

if (response.status === 401) {
localStorage.removeItem("token");
localStorage.removeItem("student");
navigate("/login");
return;
}

// Other API error
      
if (!response.ok) {
throw new Error(
data.message ||"Failed to fetch courses"
);
}

// HANDLE BOTH RESPONSE FORMATS

let courseList = [];
if (Array.isArray(data)) {
// Backend returns:
// [course1, course2, course3]

courseList = data;
} else if (
Array.isArray(data.courses)
) {
// Backend returns:
// { courses: [...] }
courseList = data.courses;
}
setCourses(courseList);
} catch (error) {
console.error(
"Courses Error:",
error
);
setError(
error.message ||
"Unable to load courses"
);
} finally {
setLoading(false);
}
};

// LOAD COURSES
useEffect(() => {
fetchCourses();
}, []);
return (
<section className="courses-page">

{/* ======================================HEADER
======================================= */}

<div className="courses-header">
<button className="back-btn"onClick={() =>navigate("/dashboard")}>← Dashboard</button>
<h2>My Courses</h2>
<p>Explore your available courses and improve your technical skills.</p>
</div>

{/* ======================================ADD COURSE BUTTON
======================================= */}

<div className="courses-actions">
<button className="primary-btn"onClick={() =>navigate("/add-course")}>➕ Add Course</button>
</div>

{/* ======================================LOADING======================================= */}

{loading && (
<div className="loading">
<p>Loading courses...</p>
</div>
)}

{/* ======================================ERROR
======================================= */}

{!loading && error && (
<div className="error-message">
<p>{error}</p>
<button className="primary-btn"onClick={fetchCourses}>Try Again</button>
</div>
)}

{/* ======================================NO COURSES======================================= */}

{!loading &&!error &&courses.length === 0 && (
<div className="no-courses">
<h3>No courses available</h3>
<p>Courses will appear here once they are added.</p>
<button className="primary-btn"onClick={() =>navigate("/add-course")}>➕ Add Your First Course
</button>
</div>
)}

{/* ======================================COURSES GRID======================================= */}

{!loading &&!error &&courses.length > 0 && (
<div className="courses-grid">
{courses.map((course) => (
<div className="course-card"key={course._id}>

{/* Icon */}
<div className="course-icon">
{course.icon || "📚"}
</div>

{/* Title */}
<h3>{course.title}</h3>

{/* Description */}
<p>{course.description}</p>

{/* Details */}
<div className="course-details">
{course.instructor && (
<span>👨‍🏫{" "}{course.instructor}
</span>
)}
{course.duration && (
<span>⏱️{" "}{course.duration}
</span>
)}
<span>📊{" "}{course.level ||"Beginner"}
</span>
</div>
{/* View Course */}

<button className="primary-btn"onClick={() =>alert(`${course.title} selected successfully!`)}>
View Course</button>
</div>
))}
</div>
)}
</section>
);
}
export default Courses;
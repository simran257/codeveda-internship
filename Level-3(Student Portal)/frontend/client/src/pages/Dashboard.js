import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
const navigate = useNavigate();

const [student, setStudent] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

// GET STUDENT PROFILE
  
useEffect(() => {
const fetchProfile = async () => {
const token = localStorage.getItem("token");

// User not logged in
if (!token) {
navigate("/login");
return;
}

try {
const response = await fetch(
"http://localhost:5000/api/students/profile",
{
method: "GET",
headers: {
Authorization: `Bearer ${token}`,
"Content-Type": "application/json",
},
}
);
const data = await response.json();

// Token invalid / expired
if (!response.ok) {
localStorage.removeItem("token");
localStorage.removeItem("student");
setError(
data.message ||
"Unable to load profile"
);
navigate("/login");
return;
}

// Save latest student information
setStudent(data.student);

// Update localStorage too
localStorage.setItem(
"student",
JSON.stringify(data.student)
);
} catch (error) {
console.error(
"Profile Error:",
error
);

setError(
"Unable to connect to server."
);
} finally {
setLoading(false);
}
};
fetchProfile();
}, [navigate]);

// LOGOUT
const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("student");
navigate("/login");
};

// LOADING
if (loading) {
return (
<section className="dashboard">
<h2>Loading Dashboard...</h2>
</section>
);
}

// ERROR
if (error) {
return (
<section className="dashboard">
<h2>Error</h2>
<p>{error}</p>
<button onClick={() =>navigate("/login")}>
Go to Login
</button>
</section>
);
}

// DASHBOARD
return (
<section className="dashboard"id="dashboard">

{/* =====================================HEADER====================================== */}

<div className="dashboard-header">
<div>
<h2>Student Dashboard</h2>
<p className="dashboard-subtitle">Welcome back,{" "}
<strong>{student?.name}</strong>{" "}👋</p>
</div>
<button className="logout-btn"onClick={handleLogout}>Logout</button>
</div>

{/* =====================================PROFILE INFORMATION====================================== */}

<div className="profile-card">
<div className="profile-icon">👤</div>
<div className="profile-info">
<h3>{student?.name}</h3>
<p>📧 {student?.email}</p>
<p>📱{" "}{student?.phone ||"Not provided"}</p>
<p>🎓{" "}{student?.course ||"Not provided"}</p>
<p>📝{" "}{student?.bio ||"No bio added"}</p>
</div>
</div>

{/* =====================================DASHBOARD CARDS====================================== */}<div className="dashboard-cards">

{/* =================================PROFILE================================== */}

<div className="dashboard-card">
<div className="card-icon">👤</div>
<h3>Profile</h3>
<p>View and manage your personalinformation.</p>
<button onClick={() =>navigate("/profile")}>
View Profile</button>
</div>

{/* =================================COURSES================================== */}

<div className="dashboard-card">
<div className="card-icon">📚</div>
<h3>Courses</h3>
<p>View your available courses and subjects.</p>
<button onClick={() =>navigate("/courses")}>View Courses</button>
</div>

{/* =================================ADD COURSE================================== */}

<div className="dashboard-card">
<div className="card-icon">➕</div>
<h3>Add Course</h3>
<p>Add a new course to the Student Portal.</p>
<button onClick={() =>navigate("/add-course")}>Add Course</button>
</div>

{/* =================================ASSIGNMENTS================================== */}

<div className="dashboard-card">
<div className="card-icon">📝</div>
<h3>Assignments</h3>
<p>Check your pending and completed assignments.</p>
<button onClick={() =>navigate("/assignments")}>
View Assignments</button>
</div>
</div>
</section>
);
}
export default Dashboard;
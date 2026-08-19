import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AssignmentDetails() {
const navigate = useNavigate();
const location = useLocation();
const assignment = location.state;

// If assignment data is not available

if (!assignment) {
return (
<section className="assignments-page">
<h2>Assignment Not Found</h2>
<p>Unable to find assignment details.</p>

<button className="primary-btn"onClick={() => navigate("/assignments")}>← Back to Assignments
</button>
</section>
);
}

return (
<section className="assignment-details-page">

{/* Back Button */}

<button className="back-btn"onClick={() => navigate("/assignments")}>← Back to Assignments
</button>

{/* Assignment Details Card */}

<div className="assignment-details-card">
<div className="assignment-icon">📝</div>
<h2>{assignment.title}</h2>
<div className="details-row">
<p><strong>Subject:</strong></p>
<span>{assignment.subject}</span>
</div>

<div className="details-row">
<p><strong>Due Date:</strong></p>
<span>{assignment.dueDate}</span>
</div>

<div className="details-row">
<p><strong>Status:</strong></p>
<span className={assignment.status === "Completed"
? "status-completed": "status-pending"}>{assignment.status}</span>
</div>

{/* Description */}

<div className="assignment-description">
<h3>Assignment Description</h3>
<p>{assignment.description}</p>
</div>

{/* Action */}
{assignment.status === "Pending" && (
<button className="primary-btn"onClick={() =>alert("Assignment submitted successfully! ✅")}>Submit Assignment</button>
)}
{assignment.status === "Completed" && (
<div className="completed-message"> ✅ This assignment has been completed.</div>
)}
</div>
</section>
);
}
export default AssignmentDetails;
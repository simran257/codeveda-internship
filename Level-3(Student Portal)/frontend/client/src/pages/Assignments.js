import React from "react";
import { useNavigate } from "react-router-dom";

function Assignments() {
const navigate = useNavigate();
const assignments = [
{
id: 1,
title: "Build a Responsive Website",
subject: "Web Development",
dueDate: "25 August 2026",
status: "Pending",
description:
"Create a fully responsive website using HTML, CSS and JavaScript. The website should work properly on desktop, tablet and mobile devices.",
},

{
id: 2,
title: "MongoDB CRUD Operations",
subject: "Database Management",
dueDate: "28 August 2026",
status: "Pending",
description:"Create a MongoDB CRUD application that demonstrates Create, Read, Update and Delete operations.",
},

{
id: 3,
title: "Linked List Implementation",
subject: "Data Structures",
dueDate: "20 August 2026",
status: "Completed",
description:"Implement a singly linked list and demonstrate insertion, deletion, searching and traversal operations.",
},

{
id: 4,
title: "TCP/IP Networking Report",
subject: "Computer Networks",
dueDate: "30 August 2026",
status: "Pending",
description:"Prepare a detailed report explaining TCP/IP protocols, network layers, IP addressing and common networking concepts.",
},

{
id: 5,
title: "React Components Practice",
subject: "React Development",
dueDate: "18 August 2026",
status: "Completed",
description:"Create reusable React components and practice props, state, events and component-based application development.",
},
];
return (
<section className="assignments-page">

{/* Header */}

<div className="assignments-header">
<button className="back-btn"onClick={() => navigate("/dashboard")}>← Dashboard</button>
<h2>My Assignments</h2>
<p>View your pending and completed assignments.</p>
</div>

{/* Summary */}

<div className="assignment-summary">
<div className="summary-card">
<h3>{assignments.length}</h3>
<p>Total Assignments</p>
</div>

<div className="summary-card">
<h3>
{
assignments.filter((assignment) =>assignment.status === "Pending").length
}
</h3>
<p>Pending</p>
</div>

<div className="summary-card">
<h3>
{ assignments.filter((assignment) =>assignment.status === "Completed").length
}
</h3>
<p>Completed</p>
</div>
</div>

{/* Assignment Cards */}

<div className="assignments-grid">
{assignments.map((assignment) => (
<div className="assignment-card"key={assignment.id}>
<div className="assignment-icon">📝</div>
<h3>{assignment.title}</h3>
<p><strong>Subject:</strong>{" "}{assignment.subject}</p>
<p><strong>Due Date:</strong>{" "}{assignment.dueDate}</p>

<div className="assignment-status">
<span className={assignment.status === "Completed"? "status-completed": "status-pending"}>{assignment.status}</span>
</div>

{/* View Assignment */}

<button className="primary-btn"onClick={() =>navigate(`/assignments/${assignment.id}`,{
state: assignment,})}>View Assignment</button>
</div>
))}
</div>
</section>
);
}
export default Assignments;
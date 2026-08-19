import React from "react";
import {
BrowserRouter,
Routes,
Route,
} from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import AssignmentDetails from "./pages/AssignmentDetails";
import AddCourse from "./pages/AddCourse";

// HOME PAGE

function Home() {
return (
<div className="home">
<h1>
Welcome to Student Portal
</h1>
<p>
Manage your student profile,courses and assignments easily.
</p>
</div>
);
}

// APP

function App() {
return (
<BrowserRouter>
<div className="App">
{/* Navigation Bar */}
<Navbar />
{/* Pages */}
<Routes>
{/* Home */}
<Route path="/"element={<Home />}/>
{/* Login */}
<Route path="/login"element={<Login />}/>
{/* Register */}
<Route path="/register"element={<Register />}/>
{/* Dashboard */}
<Route path="/dashboard"element={<Dashboard />}/>
{/* Profile */}
<Route path="/profile"element={<Profile />}/>
{/* Courses */}
<Route path="/courses"element={<Courses />}/>
{/* Add Course */}
<Route path="/add-course"element={<AddCourse />}/>
{/* Assignments */}
<Route path="/assignments"element={<Assignments/>}></Route>
{/* Assignment Details */}
<Route path="/assignments/:id"element={<AssignmentDetails />}></Route>
</Routes>
</div>
</BrowserRouter>
);
}
export default App;
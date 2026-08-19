# Student Portal
A full-stack web application designed to manage student profiles, courses, and assignments through a simple and user-friendly interface.

## Features
* 🔐 Student Registration & JWT-based Login
* 👤 Student Profile Management
* 📚 Course Management
* 📝 Assignment Management
* 📊 Student Dashboard
* 🚪 Secure Logout
* 💾 MongoDB Database Integration
* 🔗 REST API Integration

## Tech Stack

**Frontend**
* React.js
* React Router
* CSS

**Backend**
* Node.js
* Express.js
* REST APIs
* JWT Authentication
* bcrypt.js

**Database**
* MongoDB
* Mongoose

## Project Structure

text
Student Portal
├── frontend
└── React Application
│
└── backend
├── controllers
├── models
├── routes
├── middleware
├── config
└── server.js


## Installation & Setup

### 1. Clone the Project
bash
git clone <repository-url>
cd Student-Portal

### 2. Setup Backend
bash
cd backend
npm install
npm run dev

Backend runs on:
`http://localhost:5000`

### 3. Setup Frontend
Open a new terminal:
bash
cd frontend
npm install
npm start

Frontend runs on:
`http://localhost:3000`

## Environment Variables
Create a `.env` file inside the `backend` folder:
env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

## Application Flow
text
Register
   ↓
Login
   ↓
JWT Authentication
   ↓
Student Dashboard
   ↓
Profile / Courses / Assignments
   ↓
MongoDB

## Author
**Simran**

## Project Status
**Completed** — Full-stack Student Portal with authentication, profile management, courses, assignments, and MongoDB integration.
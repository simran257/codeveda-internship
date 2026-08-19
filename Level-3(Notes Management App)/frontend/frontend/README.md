# 📝 Notes Management App
A full-stack web application for creating, managing, editing, and deleting notes.
Built as part of the **CodeVeda Full-Stack Development Internship**.

## 📌 Project Overview
The Notes Management App provides a simple and user-friendly interface to manage personal notes.
The application follows a **CRUD (Create, Read, Update, Delete)** architecture with a React frontend, Express/Node.js backend, and MongoDB database.

## ✨ Features
- Create new notes
- View all notes
- Edit and update notes
- Delete notes
- Note categories
- Pin/unpin notes support
- RESTful API
- MongoDB database storage
- Responsive user interface
- Error handling and validation

## 🛠️ Technology Stack
| Layer | Technology |
|------|------------|
| Frontend | React.js |
| Styling | CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| API | REST API |
| Development | Nodemon |

## 📂 Project Structure
text
Notes Management App/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── noteController.js
│   │
│   ├── models/
│   │   └── Note.js
│   │
│   ├── routes/
│   │   └── noteRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
├── public/
│
├── src/
│  ├── components/
│  │   ├── NoteForm.js
│  │   └── NoteList.js
│  │
│  ├── services/
│  │   └── noteService.js
│  │
│  ├── App.js
│  ├── App.css
│  ├── index.js
│  └── index.css
|
└── package.json
import React, { useEffect, useState } from "react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import {
getNotes,
createNote,
updateNote,
deleteNote
} from "./services/noteService";
import "./App.css";
function App() {
const [notes, setNotes] = useState([]);
const [editingNote, setEditingNote] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
loadNotes();
}, []);
const loadNotes = async () => {
try {
setLoading(true);
setError("");
const data = await getNotes();
if (Array.isArray(data)) {
setNotes(data);
} else if (data.notes && Array.isArray(data.notes)) {
setNotes(data.notes);
} else {
setNotes([]);
}
} catch (error) {
setError(error.message);
} finally {
setLoading(false);
}
};
const handleSave = async (noteData) => {
try {
setError("");
if (editingNote) {
const noteId = editingNote._id || editingNote.id;
if (!noteId) {
setError("Note ID is missing. Cannot update note.");
return;
}
const updatedNote = await updateNote(
noteId,
noteData
);
setNotes((currentNotes) =>
currentNotes.map((note) => {
const currentId = note._id || note.id;
return currentId === noteId
? {
...note,
...updatedNote,
_id: updatedNote._id || noteId
}
: note;
})
);
setEditingNote(null);
return;
}
const newNote = await createNote(noteData);
setNotes((currentNotes) => [
newNote,
...currentNotes
]);
} catch (error) {
setError(error.message);
}
};
const handleEdit = (note) => {
const noteId = note._id || note.id;
if (!noteId) {
setError("Note ID is missing. Cannot edit note.");
return;
}
setEditingNote({
...note,
_id: noteId
});
setError("");
window.scrollTo({
top: 0,
behavior: "smooth"
});
};
const handleDelete = async (id) => {
const confirmDelete = window.confirm(
"Are you sure you want to delete this note?"
);
if (!confirmDelete) {
return;
}
try {
setError("");
if (!id) {
setError("Note ID is missing. Cannot delete note.");
return;
}
await deleteNote(id);
setNotes((currentNotes) =>
currentNotes.filter((note) => {
const noteId = note._id || note.id;
return noteId !== id;
})
);
if (editingNote) {
const editingId =
editingNote._id || editingNote.id;
if (editingId === id) {
setEditingNote(null);
}
}
} catch (error) {
setError(error.message);
}
};
const handleCancel = () => {
setEditingNote(null);
setError("");
};
return (
<div className="app">

{/* Header */}
<header className="header">
<h1>📝 Notes Management App</h1>
<p>Create, manage, edit and delete your notes
</p>
</header>
<main className="container">

{/* Error Message */}
{error && (
<div className="error-message">
{error}
</div>
)}

{/* Note Form */}
<NoteForm onSave={handleSave}editingNote={editingNote}onCancel={handleCancel}/>

{/* Notes List */}
{loading ? (
<div className="loading">
Loading notes...
</div>
) : (
<NoteList notes={notes}onEdit={handleEdit}
onDelete={handleDelete}/>
)}
</main>

{/* Footer */}
<footer>
<p>Notes Management App | CodeVeda Internship
</p>
</footer>
</div>
);
}
export default App;
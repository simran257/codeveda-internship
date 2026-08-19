import React from "react";
function NoteList({ notes, onEdit, onDelete }) {
return (
<div className="notes-section">
<h2>All Notes</h2>
{notes.length === 0 ? (
<div className="empty-message">
<p>No notes available.</p>
<p>Create your first note!</p>
</div>
) : (
<div className="notes-grid">
{notes.map((note) => {
const noteId = note._id || note.id;
return (
<div className="note-card" key={noteId}>
<h3>{note.title}</h3>
<p>{note.content}</p>
{note.createdAt && (
<small>Created:{" "}{new Date(note.createdAt).toLocaleString()}</small>
)}
<div className="note-actions">
<button className="edit-btn"onClick={() => onEdit(note)}>Edit</button>
<button className="delete-btn"onClick={() => onDelete(noteId)}>Delete</button>
</div>
</div>
);
})}
</div>
)}
</div>
);
}
export default NoteList;
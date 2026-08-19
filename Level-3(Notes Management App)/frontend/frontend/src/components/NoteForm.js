import React, { useEffect, useState } from "react";
function NoteForm({ onSave, editingNote, onCancel }) {
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

useEffect(() => {
if (editingNote) {
setTitle(editingNote.title || "");
setContent(editingNote.content || "");
} else {
setTitle("");
setContent("");
}
}, [editingNote]);

const handleSubmit = (e) => {
e.preventDefault();
const cleanTitle = (title || "").trim();
const cleanContent = (content || "").trim();
if (!cleanTitle || !cleanContent) {
alert("Please enter both title and content.");
return;
}
onSave({
title: cleanTitle,
content: cleanContent
});

// Clear form after adding
if (!editingNote) {
setTitle("");
setContent("");
}
};
return (
<div className="note-form">
<h2>{editingNote ? "Edit Note" : "Create New Note"}</h2>
<form onSubmit={handleSubmit}>
<input type="text"placeholder="Enter note title"
value={title}onChange={(e) => setTitle(e.target.value)}/><textarea placeholder="Write your note..."value={content}onChange={(e) => setContent(e.target.value)}rows="6"/>
<div className="form-buttons">
<button type="submit">{editingNote ? "Update Note" : "Add Note"}</button>
{editingNote && (
<button type="button"className="cancel-btn"
onClick={onCancel}>Cancel</button>
)}
</div>
</form>
</div>
);
}
export default NoteForm;
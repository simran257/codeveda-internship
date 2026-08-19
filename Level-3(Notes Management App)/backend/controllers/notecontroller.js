const mongoose = require("mongoose");
const Note = require("../models/Note");
const createNote = async (req, res) => {
try {
const {
title,
content,
category,
pinned
} = req.body;
if (!title || !title.trim()) {
return res.status(400).json({
message: "Title is required"
});
}
if (!content || !content.trim()) {
return res.status(400).json({
message: "Content is required"
});
}
const note = await Note.create({
title: title.trim(),
content: content.trim(),
category: category || "General",
pinned: pinned || false
});
res.status(201).json(note);
} catch (error) {
res.status(500).json({
message: error.message
});
}
};
const getNotes = async (req, res) => {
try {
const notes = await Note.find().sort({
pinned: -1,
createdAt: -1
});
res.status(200).json(notes);
} catch (error) {
res.status(500).json({
message: error.message
});
}
};
const getNote = async (req, res) => {
try {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
return res.status(400).json({
message: "Invalid note ID"
});
}
const note = await Note.findById(id);
if (!note) {
return res.status(404).json({
message: "Note not found"
});
}
res.status(200).json(note);
} catch (error) {
res.status(500).json({
message: error.message
});
}
};
const updateNote = async (req, res) => {
try {
const { id } = req.params;
if (!id) {
return res.status(400).json({
message: "Note ID is required"
});
}
if (!mongoose.Types.ObjectId.isValid(id)) {
return res.status(400).json({
message: "Invalid note ID"
});
}
const {
title,
content,
category,
pinned
} = req.body;
if (!title || !title.trim()) {
return res.status(400).json({
message: "Title is required"
});
}
if (!content || !content.trim()) {
return res.status(400).json({
message: "Content is required"
});
}
const updatedNote = await Note.findByIdAndUpdate(
id,
{
title: title.trim(),
content: content.trim(),
category: category || "General",
pinned: pinned || false
},
{
new: true,
runValidators: true
}
);
if (!updatedNote) {
return res.status(404).json({
message: "Note not found"
});
}
res.status(200).json(updatedNote);
} catch (error) {
res.status(500).json({
message: error.message
});
}
};
const deleteNote = async (req, res) => {
try {
const { id } = req.params;
if (!id) {
return res.status(400).json({
message: "Note ID is required"
});
}
if (!mongoose.Types.ObjectId.isValid(id)) {
return res.status(400).json({
message: "Invalid note ID"
});
}
const deletedNote = await Note.findByIdAndDelete(id);
if (!deletedNote) {
return res.status(404).json({
message: "Note not found"
});
}
res.status(200).json({
message: "Note deleted successfully",
id: id
});
} catch (error) {
res.status(500).json({
message: error.message
});
}
};
module.exports = {
createNote,
getNotes,
getNote,
updateNote,
deleteNote
};
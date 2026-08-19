const API_URL = "http://localhost:5000/api/notes";

// GET ALL NOTES
export const getNotes = async () => {
const response = await fetch(API_URL);
if (!response.ok) {
const data = await response.json();
throw new Error(data.message || "Failed to fetch notes");
}
return await response.json();
};


// CREATE NOTE
export const createNote = async (note) => {
const response = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(note)
});
const data = await response.json();
if (!response.ok) {
throw new Error(data.message || "Failed to create note");
}
return data;
};

// UPDATE NOTE
export const updateNote = async (id, note) => {
if (!id) {
throw new Error("Note ID is missing");
}
const response = await fetch(`${API_URL}/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(note)
});
const data = await response.json();
if (!response.ok) {
throw new Error(data.message || "Failed to update note");
}
return data;
};

// DELETE NOTE
export const deleteNote = async (id) => {
if (!id) {
throw new Error("Note ID is missing");
}
const response = await fetch(`${API_URL}/${id}`, {
method: "DELETE"
});
const data = await response.json();
if (!response.ok) {
throw new Error(data.message || "Failed to delete note");
}
return data;
};
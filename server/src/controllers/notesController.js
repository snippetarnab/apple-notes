//For fetching all notes
export async function getAllNotes(req, res) {
  res.status(200).json({ message: `Note fetches successfully.` });
}

//For creating a note
export async function createNote(req, res) {
  res.status(201).json({ message: `Note created successfully.` });
}

//For updating a note
export async function updateNote(req, res) {
  res.status(200).json({ message: `Note updated successfully.` });
}

//For deleting a note
export async function deleteNote(req, res) {
  res.status(200).json({ message: `Notes deleted successfully.` });
}
import Note from "../models/Note.js";
import noteModel from "../models/Note.js";
import mongoose from "mongoose";

//For fetching all notes
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For creating a note
export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const savedNote = new Note({ title, content });
    savedNote.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For updating a note
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const noteId = req.params.id;
    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id format." });
    }

    const noteIdExist = await noteModel.findById(noteId);

    if (!noteIdExist) {
      return res.status(404).json({ message: "Note id is not found." });
    }
    await Note.findByIdAndUpdate(noteId, { title, content }, { new: true });
    res.status(200).json({ message: `Note updated successfully.` });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For deleting a note
export async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;
    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id format." });
    }

    const noteIdExist = await noteModel.findById(noteId);

    if (!noteIdExist) {
      return res.status(404).json({ message: "Note id is not found." });
    }
    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: `Note deleted successfully.` });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

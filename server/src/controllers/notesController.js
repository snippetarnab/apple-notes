import Note from "../models/Note.js";
import mongoose from "mongoose";
import { getAuth } from "@clerk/express";

//For fetching all notes
export async function getAllNotes(req, res) {
  try {
    const { userId } = getAuth(req);
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//Fetching the single note
export async function getNoteById(req, res) {
  try {
    const { userId } = getAuth(req);
    const noteId = req.params.id;
    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id format." });
    }
    const noteExist = await Note.findOne({ _id: noteId, userId });
    if (!noteExist) {
      return res.status(404).json({ message: "Note id is not found." });
    }
    return res.json(noteExist);
  } catch (error) {
    console.error("Error in getNoteById:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For creating a note
export async function createNote(req, res) {
  try {
    const { userId } = getAuth(req);
    const { title, content } = req.body;
    const savedNote = await new Note({ title, content, userId }).save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For updating a note
export async function updateNote(req, res) {
  try {
    const { userId } = getAuth(req);
    const { title, content } = req.body;
    const noteId = req.params.id;
    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id format." });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      { title, content },
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note id is not found." });
    }
    res.status(200).json({ message: `Note updated successfully.` });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

//For deleting a note
export async function deleteNote(req, res) {
  try {
    const { userId } = getAuth(req);
    const noteId = req.params.id;
    // Check if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
      return res.status(400).json({ message: "Invalid note id format." });
    }

    const deletedNote = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!deletedNote) {
      return res.status(404).json({ message: "Note id is not found." });
    }
    res.status(200).json({ message: `Note deleted successfully.` });
  } catch (error) {
    console.error("Error in updateNote:", error);
    res.status(500).json({ message: "Internel server error." });
  }
}

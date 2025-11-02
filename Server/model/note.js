import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // user se link
    ref: "User", // reference to User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const NoteModel = mongoose.model("Note", noteSchema);

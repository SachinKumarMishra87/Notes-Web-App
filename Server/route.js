import express from 'express';
import { CreateNote, DeleteNote, GetNotes, Login, Register, UpdateNote } from './controller/register.js';
const router = express.Router();
import auth from './middleware/auth.js';
router.post("/register", Register);
router.post("/login", Login);
router.post("/create-note", auth, CreateNote);
router.get("/get-note", auth, GetNotes);
router.put("/update-note/:id", auth, UpdateNote);
router.delete("/delete-note/:noteId", auth, DeleteNote);


export default router;
import { UserModel } from "../model/model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NoteModel } from "../model/note.js";
import dotenv from "dotenv";
dotenv.config();

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await UserModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();

        return res.status(201).json({
            message: "User registered successfully",
            success: true,
            user: {
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // JWT generation can be added here for better authentication management
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRE }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token,
            user: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const CreateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.id;  // 👈 token se mila hua user id

        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newNote = new NoteModel({
            title,
            content,
            user: userId,
        })
        const savedNote = await newNote.save();
        return res.status(201).json({
            message: "Note created successfully",
            success: true,
            note: savedNote
        })

    } catch (error) {
        console.log(error)
    }
}

export const GetNotes = async (req, res) => {
  try {
    const userId = req.user.id;
    const notes = await NoteModel.find({ user: userId });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const DeleteNote = async (req, res) => {
    try {
        const userId = req.user.id; // ✅ verifyToken middleware se mila user id
        const { noteId } = req.params; // ✅ frontend se bheja gaya noteId

        // Step 1: Check note exist karta hai ya nahi
        const note = await NoteModel.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // Step 2: Check user authorized hai ya nahi (ownership verify)
        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        // Step 3: Delete note
        await NoteModel.findByIdAndDelete(noteId);

        res.status(200).json({ message: "Note deleted successfully" , success: true });
    } catch (error) {
        console.error("❌ Error deleting note:", error);
        res.status(500).json({ message: "Server error while deleting note" });
    }
};

export const UpdateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedNote = await NoteModel.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        return res.status(200).json({
            message: "Note updated successfully",
            success: true,
            note: updatedNote
        })
    } catch (error) {
        console.log(error)
    }
}
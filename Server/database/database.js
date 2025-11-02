import mongoose from "mongoose";
export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sachinmishra8707_db_user:Bplkf8ICx61Ax6NL@cluster0.r45fsyk.mongodb.net/myDatabase?retryWrites=true&w=majority"
    );
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.log("❌ Database connection failed:", error.message);
  }
};

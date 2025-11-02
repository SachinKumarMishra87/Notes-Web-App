import express from "express";
import { connectDB } from "./database/database.js";
import router from "./route.js";
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());
app.use(cors())
app.use("/", router);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./src/routes/user.route.js";
import postRoutes from "./src/routes/post.route.js";


dotenv.config({
  path: './.env'
});
connectDB();

const app = express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
const PORT = process.env.PORT || 2500
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});

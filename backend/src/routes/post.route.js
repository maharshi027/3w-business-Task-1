import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.js";
import {
  createPost,
  getPosts,
  likePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/create-post", verifyToken, upload.array("images", 5), createPost);
router.post("/like/:id", verifyToken, likePost);
router.delete("/:id", verifyToken, deletePost);

export default router;

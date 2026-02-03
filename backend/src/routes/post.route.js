import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", verifyToken, createPost);
router.post("/like/:id", verifyToken, likePost);
router.post("/comment/:id", verifyToken, commentPost);
router.delete("/:id", verifyToken, deletePost);

export default router;

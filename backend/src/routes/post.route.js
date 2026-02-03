import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", authMiddleware, createPost);
router.post("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, commentPost);
router.delete("/:id", authMiddleware, deletePost);

export default router;

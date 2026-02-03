import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  const { text, image } = req.body;

  if (!text && !image) {
    return res.status(400).json({ message: "Post cannot be empty" });
  }

  const post = await Post.create({
    user: req.user.id,
    text,
    image,
  });

  res.json(post);
};

export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post.likes.includes(req.user.username)) {
    post.likes.push(req.user.username);
    await post.save();
  }

  res.json(post);
};

export const commentPost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  post.comments.push({
    username: req.user.username,
    text: req.body.text,
  });

  await post.save();
  res.json(post);
};

export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};

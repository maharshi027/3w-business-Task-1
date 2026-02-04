import Post from "../models/post.model.js";

export const createPost = async (req, res) => {
  console.log(req.file);
  
  try {
    const imageUrl = req.file?.path;

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const post = await Post.create({
      user: req.user.id,
      image: imageUrl,
      caption: req.body.caption,
    });

    res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

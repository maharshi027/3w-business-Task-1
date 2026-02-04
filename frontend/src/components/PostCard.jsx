import api from "../api/axios";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function PostCard({ post, refresh }) {
  const [comment, setComment] = useState("");
  const { username } = useAuth();

  const like = async () => {
    if (post.likes.includes(username)) return;
    await api.post(`/posts/like/${post._id}`);
    refresh();
  };

  const addComment = async () => {
    if (!comment.trim()) return;
    await api.post(`/posts/comment/${post._id}`, { text: comment });
    setComment("");
    refresh();
  };

  const del = async () => {
    await api.delete(`/posts/${post._id}`);
    refresh();
  };

  return (
    <Card className="mt-3 p-3">
      <h6>{post.text}</h6>
      {post.image && <img src={post.image} alt="" className="img-fluid" />}

      <div className="mt-2">
        <Button size="sm" onClick={like}>
          ❤️ {post.likes.length}
        </Button>

        <span className="ms-3">💬 {post.comments.length}</span>

        {post.username === username && (
          <Button
            size="sm"
            variant="danger"
            className="ms-3"
            onClick={del}
          >
            Delete
          </Button>
        )}
      </div>

      <Form.Control
        placeholder="Write a comment..."
        className="mt-2"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />

      <Button size="sm" className="mt-2" onClick={addComment}>
        Comment
      </Button>
    </Card>
  );
}

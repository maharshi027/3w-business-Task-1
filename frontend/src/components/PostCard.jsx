import { useState } from "react";
import { Card, Button, Stack, Dropdown, Form } from "react-bootstrap";
import api from "../api/Axios";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post, refresh }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const isLiked = post.likes?.includes(user?.username);

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleLike = async () => {
    try {
      await api.post(`/posts/like/${post._id}`);
      refresh();
    } catch (err) {
      console.error("Like failed", err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    try {
      await api.post(`/posts/comment/${post._id}`, { text: commentText });
      setCommentText("");
      refresh();
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  return (
    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "15px" }}>
      <Card.Body>
        <Stack direction="horizontal" gap={3} className="mb-3 align-items-start">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold shadow-sm"
            style={{ width: "45px", height: "45px", flexShrink: 0 }}
          >
            {post.user?.username?.[0]?.toUpperCase() || "U"}
          </div>

          <div className="flex-grow-1">
            <h6 className="mb-0 fw-bold text-dark">
              {post.user?.username || "Anonymous"}
            </h6>
            <small className="text-muted">
              {new Date(post.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>

          {user?.username === post.user?.username && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="text-muted p-0 shadow-none border-0 no-caret">
                <span style={{ fontSize: "1.2rem", lineHeight: "1" }}>⋮</span>
              </Dropdown.Toggle>
              <Dropdown.Menu className="shadow-sm border-0">
                <Dropdown.Item className="text-danger" onClick={handleDelete}>
                  🗑 Delete Post
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Stack>

        <Card.Text className="text-dark mb-3" style={{ fontSize: "1.05rem", whiteSpace: "pre-line" }}>
          {post.caption}
        </Card.Text>

        {post.image && Array.isArray(post.image) && post.image.map((img, index) => (
          <div key={index} className="mb-3 overflow-hidden" style={{ borderRadius: "12px" }}>
            <Card.Img
              variant="bottom"
              src={img}
              alt="Post content"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        ))}

        <div className="d-flex gap-3 mb-2 px-1">
          <small className="text-muted fw-medium">{post.likes?.length || 0} likes</small>
          <small className="text-muted fw-medium" style={{ cursor: 'pointer' }} onClick={() => setShowComments(!showComments)}>
            {post.comments?.length || 0} comments
          </small>
        </div>

        <hr className="text-muted opacity-25 mt-0" />

        <Stack direction="horizontal" gap={4} className="mt-2">
          <Button
            variant="link"
            onClick={handleLike}
            className={`text-decoration-none p-0 fw-medium ${isLiked ? "text-primary" : "text-muted"}`}
          >
            {isLiked ? "❤️ Liked" : "👍 Like"}
          </Button>
          <Button
            variant="link"
            onClick={() => setShowComments(!showComments)}
            className="text-decoration-none text-muted p-0 fw-medium"
          >
            💬 Comment
          </Button>
        </Stack>

        {showComments && (
          <div className="mt-3">
            <Form onSubmit={handleComment} className="d-flex gap-2 mb-3">
              <Form.Control
                size="sm"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="rounded-pill border-light bg-light"
              />
              <Button type="submit" variant="primary" size="sm" className="rounded-pill">Send</Button>
            </Form>
            
            {post.comments?.map((c, i) => (
              <div key={i} className="bg-light p-2 rounded-3 mb-2" style={{ fontSize: "0.9rem" }}>
                <span className="fw-bold me-2">{c.username}</span>
                <span>{c.text}</span>
              </div>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default PostCard;
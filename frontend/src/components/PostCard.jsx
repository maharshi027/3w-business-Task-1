import { Card, Button, Stack, Dropdown } from "react-bootstrap";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const PostCard = ({ post, refresh }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    try {
      await api.delete(`/posts/${post._id}`);
      refresh();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "15px" }}>
      <Card.Body>
        <Stack
          direction="horizontal"
          gap={3}
          className="mb-3 align-items-start"
        >
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
              <Dropdown.Toggle
                variant="link"
                className="text-muted p-0 shadow-none border-0 no-caret"
              >
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

        <Card.Text
          className="text-dark mb-3"
          style={{ fontSize: "1.05rem", whiteSpace: "pre-line" }}
        >
          {post.caption}
        </Card.Text>

        {post.image && (
          <div
            className="mb-3 overflow-hidden"
            style={{ borderRadius: "12px" }}
          >
            <Card.Img
              variant="bottom"
              src={post.image}
              alt="Post content"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        )}

        <hr className="text-muted opacity-25" />

        <Stack direction="horizontal" gap={4} className="mt-2">
          <Button
            variant="link"
            className="text-decoration-none text-muted p-0 hover-primary fw-medium"
          >
            👍 Like
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-muted p-0 hover-primary fw-medium"
          >
            💬 Comment
          </Button>
          <Button
            variant="link"
            className="text-decoration-none text-muted p-0 ms-auto"
          >
            🔖
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default PostCard;

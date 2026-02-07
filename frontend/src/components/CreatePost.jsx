import { useState, useRef } from "react";
import { Card, Button, Form, Image, Stack, Badge } from "react-bootstrap";
import api from "../api/Axios";

function CreatePost({ fetchPosts }) {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const MAX_CHARACTERS = 280;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

const submitPost = async () => {
    if (!caption && !image) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("caption", caption);
      
      if (image) {
        formData.append("images", image); 
      }

      await api.post("/posts/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCaption("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      fetchPosts();
    } catch (err) {
      console.error("Post failed:", err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="shadow-sm mb-4 border-0" style={{ borderRadius: "15px" }}>
      <Card.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="What's on your mind?"
              value={caption}
              onChange={(e) => setCaption(e.target.value.slice(0, MAX_CHARACTERS))}
              className="border-0 shadow-none p-0"
              style={{ resize: "none", fontSize: "1.1rem" }}
            />
          </Form.Group>

          {image && (
            <div className="d-flex align-items-center p-2 mb-2 bg-light rounded shadow-sm" style={{ width: "fit-content" }}>
              <div style={{ width: "80px", height: "80px", position: "relative" }}>
                <Image
                  src={URL.createObjectURL(image)}
                  rounded
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle border border-light"
                  style={{ cursor: "pointer" }}
                  onClick={() => setImage(null)}
                >
                  &times;
                </Badge>
              </div>
              <small className="ms-3 text-muted text-truncate" style={{ maxWidth: "150px" }}>
                {image.name}
              </small>
            </div>
          )}

          <hr className="my-2" />

          <Stack direction="horizontal" gap={3}>
            <input
              type="file"
              accept="image/*"
              className="d-none"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="rounded-pill px-3 border-0"
              onClick={() => fileInputRef.current.click()}
            >
              <span className="me-1">🖼️</span> Photo
            </Button>

            <div className="ms-auto d-flex align-items-center">
              <small className={`me-3 ${caption.length >= MAX_CHARACTERS ? 'text-danger' : 'text-muted'}`}>
                {caption.length}/{MAX_CHARACTERS}
              </small>

              <Button
                variant="primary"
                onClick={submitPost}
                disabled={loading || (!caption && !image)}
                className="rounded-pill px-4 fw-bold"
                size="sm"
              >
                {loading ? "Posting..." : "Post"}
              </Button>
            </div>
          </Stack>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreatePost;
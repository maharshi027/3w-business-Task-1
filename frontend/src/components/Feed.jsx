import { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Card, ListGroup } from "react-bootstrap";
import api from "../api/Axios";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="bg-light min-vh-100 py-4" style={{ marginTop: "56px" }}>
      <Container>
        <Row className="justify-content-center">
          
          <Col md={8} lg={6}>
            <CreatePost fetchPosts={loadPosts} />

            {loading ? (
              <div className="d-flex justify-content-center mt-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : posts.length === 0 ? (
              <Card className="text-center p-5 border-0 shadow-sm mt-4" style={{ borderRadius: "15px" }}>
                <Card.Body>
                  <h5 className="text-muted">No posts yet 🚀</h5>
                  <small>Be the first one to share something!</small>
                </Card.Body>
              </Card>
            ) : (
              <div className="mt-4">
                {posts.map((post) => (
                  <div key={post._id} className="mb-4">
                    <PostCard post={post} refresh={loadPosts} />
                  </div>
                ))}
              </div>
            )}
          </Col>

          <Col lg={4} className="d-none d-lg-block">
            <div className="sticky-top" style={{ top: "80px", zIndex: "1" }}>
              <Card className="border-0 shadow-sm mb-3" style={{ borderRadius: "15px" }}>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">💡 About This App</Card.Title>
                  <Card.Text className="text-muted small">
                    Share moments, post images, and connect with the community in a clean, distraction-free environment.
                  </Card.Text>
                </Card.Body>
              </Card>

              <Card className="border-0 shadow-sm" style={{ borderRadius: "15px" }}>
                <Card.Body>
                  <Card.Title className="fw-bold mb-3">🔥 Tips</Card.Title>
                  <ListGroup variant="flush" className="small">
                    <ListGroup.Item className="px-0 border-0 text-muted">
                      • Add images to your posts
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 border-0 text-muted">
                      • Keep captions concise
                    </ListGroup.Item>
                    <ListGroup.Item className="px-0 border-0 text-muted">
                      • Engage with the community
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

export default Feed;
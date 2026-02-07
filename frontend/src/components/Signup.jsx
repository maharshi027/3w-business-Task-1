import { useState } from "react";
import api from "../api/axios.js";
import { Card, Form, Button, Spinner, Toast, ToastContainer, Container, FloatingLabel } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.username || !data.email || !data.password) {
      setToast({ show: true, message: "All fields are required", type: "danger" });
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", data);
      setToast({ show: true, message: "Account created! Redirecting...", type: "success" });
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setToast({ show: true, message: err.response?.data?.message || "Signup failed", type: "danger" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <ToastContainer position="top-center" className="p-3">
        <Toast bg={toast.type} show={toast.show} delay={3000} autohide onClose={() => setToast({ ...toast, show: false })}>
          <Toast.Body className="text-white text-center fw-bold">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <Container>
        <Card className="border-0 shadow-lg mx-auto" style={{ maxWidth: "450px", borderRadius: "20px" }}>
          <Card.Body className="p-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary">Join Us</h2>
              <p className="text-muted">Create your account to get started</p>
            </div>

            <Form>
              <FloatingLabel label="Username" className="mb-3">
                <Form.Control 
                  type="text" 
                  placeholder="Username" 
                  className="border-0 bg-light"
                  onChange={e => setData({ ...data, username: e.target.value })} 
                />
              </FloatingLabel>

              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com" 
                  className="border-0 bg-light"
                  onChange={e => setData({ ...data, email: e.target.value })} 
                />
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-4">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  className="border-0 bg-light"
                  onChange={e => setData({ ...data, password: e.target.value })} 
                />
              </FloatingLabel>

              <Button 
                variant="primary" 
                size="lg"
                className="w-100 shadow-sm mb-4 rounded-pill fw-bold" 
                onClick={submit} 
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Sign Up"}
              </Button>

              <div className="text-center">
                <span className="text-muted">Already a member? </span>
                <Link to="/login" className="text-decoration-none fw-bold">Login</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
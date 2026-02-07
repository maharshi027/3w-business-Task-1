import { useState } from "react";
import api from "../api/Axios";
import { Card, Form, Button, Spinner, Toast, ToastContainer, Container, FloatingLabel } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    if (!email || !password) {
      setToast({ show: true, message: "Please fill in all fields", type: "danger" });
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.username);
      setToast({ show: true, message: "Welcome back!", type: "success" });
      setTimeout(() => navigate("/feed"), 800);
    } catch (err) {
      setToast({ show: true, message: err.response?.data?.message || "Login failed", type: "danger" });
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
              <h2 className="fw-bold text-primary">Welcome Back</h2>
              <p className="text-muted">Log in to your account</p>
            </div>

            <Form>
              <FloatingLabel label="Email address" className="mb-3">
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com" 
                  className="border-0 bg-light"
                  onChange={e => setEmail(e.target.value)} 
                />
              </FloatingLabel>

              <FloatingLabel label="Password" className="mb-4">
                <Form.Control 
                  type="password" 
                  placeholder="Password" 
                  className="border-0 bg-light"
                  onChange={e => setPassword(e.target.value)} 
                />
              </FloatingLabel>

              <Button 
                variant="primary" 
                size="lg"
                className="w-100 shadow-sm mb-4 rounded-pill fw-bold" 
                onClick={submit} 
                disabled={loading}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>

              <div className="text-center">
                <span className="text-muted">New here? </span>
                <Link to="/signup" className="text-decoration-none fw-bold">Create Account</Link>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
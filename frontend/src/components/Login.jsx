import { useState } from "react";
import api from "../api/axios";
import {
  Card,
  Form,
  Button,
  Spinner,
  Toast,
  ToastContainer,
} from "react-bootstrap";
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
      setToast({
        show: true,
        message: "Please enter email and password",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.username);

      setToast({
        show: true,
        message: "Login successful!",
        type: "success",
      });

      setTimeout(() => {
        navigate("/feed");
      }, 800);
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Login failed",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg={toast.type}
          show={toast.show}
          delay={3000}
          autohide
          onClose={() => setToast({ ...toast, show: false })}
        >
          <Toast.Body className="text-white">
            {toast.message}
          </Toast.Body>
        </Toast>
      </ToastContainer>

      {/* Login Card */}
      <Card className="p-4 mx-auto" style={{ maxWidth: "420px" }}>
        <h4 className="text-center mb-3">Login</h4>

        <Form.Control
          placeholder="Email"
          type="email"
          className="mt-2"
          onChange={e => setEmail(e.target.value)}
        />

        <Form.Control
          placeholder="Password"
          type="password"
          className="mt-2"
          onChange={e => setPassword(e.target.value)}
        />

        <Button
          className="mt-3 w-100"
          onClick={submit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>

        <div className="text-center mt-3">
          <Link to="/signup">Don't have an account? Signup</Link>
        </div>
      </Card>
    </>
  );
}

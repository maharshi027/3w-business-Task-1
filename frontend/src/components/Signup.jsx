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
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const submit = async () => {
    if (!data.username || !data.email || !data.password) {
      setToast({
        show: true,
        message: "All fields are required",
        type: "danger",
      });
      return;
    }

    try {
      setLoading(true);
      await api.post("/auth/signup", data);

      setToast({
        show: true,
        message: "Account created successfully! Please login.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setToast({
        show: true,
        message: err.response?.data?.message || "Signup failed",
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

      {/* Signup Card */}
      <Card className="p-4 mx-auto" style={{ maxWidth: "420px" }}>
        <h4 className="text-center mb-3">Create Account</h4>

        <Form.Control
          placeholder="Username"
          className="mt-2"
          onChange={e => setData({ ...data, username: e.target.value })}
        />

        <Form.Control
          placeholder="Email"
          type="email"
          className="mt-2"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <Form.Control
          placeholder="Password"
          type="password"
          className="mt-2"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        <Button
          className="mt-3 w-100"
          onClick={submit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Creating account...
            </>
          ) : (
            "Signup"
          )}
        </Button>

        <div className="text-center mt-3">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </Card>
    </>
  );
}

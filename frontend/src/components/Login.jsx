import { useState } from "react";
import api from "../api/axios";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async () => {
    const res = await api.post("/auth/login", { email, password });
    login(res.data.token, res.data.username);
    navigate("/feed");
  };

  return (
    <Card className="p-4">
      <h5>Login</h5>

      <Form.Control
        placeholder="Email"
        className="mt-2"
        onChange={e => setEmail(e.target.value)}
      />

      <Form.Control
        placeholder="Password"
        type="password"
        className="mt-2"
        onChange={e => setPassword(e.target.value)}
      />

      <Button className="mt-3 w-100" onClick={submit}>
        Login
      </Button>

      <div className="text-center mt-3">
        <Link to="/signup">Don't have an account? Signup</Link>
      </div>
    </Card>
  );
}

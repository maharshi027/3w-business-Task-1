import { useState } from "react";
import api from "../api/axios";
import { Card, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const submit = async () => {
    await api.post("/auth/signup", data);
    navigate("/login");
  };

  return (
    <Card className="p-4">
      <h5>Signup</h5>

      <Form.Control
        placeholder="Username"
        className="mt-2"
        onChange={e => setData({ ...data, username: e.target.value })}
      />

      <Form.Control
        placeholder="Email"
        className="mt-2"
        onChange={e => setData({ ...data, email: e.target.value })}
      />

      <Form.Control
        placeholder="Password"
        type="password"
        className="mt-2"
        onChange={e => setData({ ...data, password: e.target.value })}
      />

      <Button className="mt-3 w-100" onClick={submit}>
        Signup
      </Button>

      <div className="text-center mt-3">
        <Link to="/login">Already have an account? Login</Link>
      </div>
    </Card>
  );
}

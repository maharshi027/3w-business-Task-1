import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <NavbarComp />
      <Container className="mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Container>
    </AuthProvider>
  );
}

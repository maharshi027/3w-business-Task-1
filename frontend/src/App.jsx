import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import NavbarComp from "./components/NavbarComp";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Feed from "./components/Feed";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarComp />
        <Routes>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />} />

          <Route 
            path="/feed" 
            element={
              <ProtectedRoute>
                <Feed />
              </ProtectedRoute>
            } 
          />

          <Route path="/" element={<Navigate to="/feed" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
import { Navbar, Container, Nav, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NavbarComp = () => {
  const { token, logout, username } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar 
      bg="white" 
      expand="lg" 
      sticky="top" 
      className="shadow-sm border-bottom py-2"
    >
      <Container>
        <Navbar.Brand 
          as={Link} 
          to="/feed" 
          className="fw-bold text-primary fs-4"
          style={{ letterSpacing: "-1px" }}
        >
          3W Social
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {!token ? (
              <>
                <Nav.Link as={Link} to="/login" className="fw-medium px-3">
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary" 
                  className="rounded-pill px-4 ms-lg-2"
                >
                  Get Started
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/feed" className="fw-medium px-3 text-dark">
                  Home
                </Nav.Link>
                
                <Dropdown align="end" className="ms-lg-3">
                  <Dropdown.Toggle 
                    variant="light" 
                    id="dropdown-user" 
                    className="rounded-pill border-0 bg-light px-3 d-flex align-items-center"
                  >
                    <span className="me-2 text-muted small">Hello,</span>
                    <span className="fw-bold">{username || "User"}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="shadow border-0 mt-2" style={{ borderRadius: "12px" }}>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      👤 My Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/settings")}>
                      ⚙️ Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                      🚪 Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComp;
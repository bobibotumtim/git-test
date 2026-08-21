import { Button, Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../provider/AppProvider";

const Top = () => {
  const { user, logout } = useAppContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <Navbar className="portal-navbar" expand="md">
      <Container>
        <Navbar.Brand className="text-white fw-bold">
          FPT Education Learning Material Portal
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="portal-navigation" />
        <Navbar.Collapse id="portal-navigation" className="justify-content-end">
          <span className="welcome-message">
            Hello, {user.fullName} ({user.role})
          </span>
          <Button variant="light" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Top;

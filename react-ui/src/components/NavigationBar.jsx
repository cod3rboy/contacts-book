import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const { user } = useAuth();
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Contacts Book 📖</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {user && (
            <Nav className="ms-auto">
              <NavDropdown title={user.name} id="nav-dropdown">
                <NavDropdown.Item>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to="/profile"
                  >
                    Profile
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to="/logout"
                  >
                    Logout
                  </Link>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

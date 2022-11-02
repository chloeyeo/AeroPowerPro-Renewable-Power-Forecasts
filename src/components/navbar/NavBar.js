import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import "react-bootstrap";

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Jehtro's Power Forecast
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" style={{ color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/about" style={{ color: "white" }}>
                About
              </Nav.Link>
              <NavDropdown
                title={<span style={{ color: "white" }}>Dropdown</span>}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/signup" style={{ color: "white" }}>
                Signup/Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

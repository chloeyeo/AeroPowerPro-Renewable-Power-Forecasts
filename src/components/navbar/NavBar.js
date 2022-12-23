import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "react-bootstrap";

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Jethro's Power Forecast
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
              <Nav.Link href="/contactus" style={{ color: "white" }}>
                Contact Us
              </Nav.Link>
              <Nav.Link href="/login" style={{ color: "white" }}>
                Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

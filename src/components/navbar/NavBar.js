import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "react-bootstrap";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
      <Container>
        <Navbar.Brand href="/" style={{ color: "white" }}>
          Jethro's Power Forecasts
        </Navbar.Brand>
        <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                About
              </Link>
              <Link
                to="/contactus"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                Login
              </Link>
              <Link
                to="/register"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                Register
              </Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

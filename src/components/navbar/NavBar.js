import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "react-bootstrap";
import { Link } from "react-router-dom";
import { Cookies } from "react-cookie";

function NavBar() {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(
    cookies.get("userIn") === "true"
  );
  if (!isLoggedIn) {
    return (
      <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Jethro's Power Forecasts
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="basic-navbar-nav">
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
  } else {
    return (
      <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
        <Container>
          <Navbar.Brand href="/" style={{ color: "white" }}>
            Jethro's Power Forecasts
          </Navbar.Brand>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="basic-navbar-nav">
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
                  to="/profile"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: 20,
                    paddingRight: 15,
                  }}
                >
                  Profile
                </Link>
                <Link
                  to="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: 20,
                    paddingRight: 15,
                  }}
                  onClick={() => {
                    setIsLoggedIn(false);
                    cookies.set("userIn", false);
                    cookies.get(cookies.get("LoggedInUser")).loggedIn = false;
                    cookies.set("LoggedInUser", null);
                    window.location.replace("http://127.0.0.1:3000");
                  }}
                >
                  Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;

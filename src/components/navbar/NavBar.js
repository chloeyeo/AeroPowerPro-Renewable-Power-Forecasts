import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "react-bootstrap";

function NavBar() {
  const links = [
    {
      display: "Home",
      link: "/",
    },
    {
      display: "About",
      link: "/about",
    },
    {
      display: "Contact Us",
      link: "/contactus",
    },
    {
      display: "Login",
      link: "/login",
    },
    {
      display: "Register",
      link: "/register",
    },
  ];

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
              {links.map(({ display, link }) => (
                <Nav.Link key={display} href={link} style={{ color: "white" }}>
                  {display}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
  );
}

export default NavBar;

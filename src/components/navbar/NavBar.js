import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "react-bootstrap";
import { Link } from "react-router-dom";
import withLinks from "./withLinks";

const NavBar = ({ links }) => (
  <Navbar style={{ backgroundColor: "#373b44" }} expand="lg">
    <Container>
      <Navbar.Brand href="/" style={{ color: "white" }}>
        Jethro's Power Forecasts
      </Navbar.Brand>
      <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="basic-navbar-nav">
          <Nav className="me-auto">
            {links.map(({ text, link, onClick }) => (
              <Link
                key={link}
                to={link}
                onClick={onClick}
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: 20,
                  paddingRight: 15,
                }}
              >
                {text}
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
);

export default withLinks(NavBar);

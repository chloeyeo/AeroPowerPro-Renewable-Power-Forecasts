import React from "react";
import { NavBar } from "../../components";
import "./register.css";

const Register = () => {
  const test = 5;
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="registercontent"></div>
      <div className="registercontent">
        <form>
          <p className="formtitle">Create an account</p>
          <div>
            <input
              className="namefield"
              type="text"
              name="fname"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="First Name"
              id="small"
            />
            <input
              className="namefield"
              type="text"
              name="lname"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Last Name"
              id="small"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Password"
              id="small"
            />
            <input
              type="password"
              name="cpassword"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Confirm Password"
              id="small"
            />
          </div>
          <input
            className="email"
            type="text"
            name="email"
            style={{ backgroundColor: "#d9d9d9" }}
            placeholder="E-mail"
            id="small"
          />
          <input
            className="register"
            type="submit"
            value="Register"
            style={{ backgroundColor: "#d9d9d9", color: "#373B44" }}
          />
        </form>
      </div>
    </>
  );
};

export default Register;

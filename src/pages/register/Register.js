import React from "react";
import { NavBar } from "../../components";
import "./register.css";

const Register = () => {
  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

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
              className="username"
              type="text"
              name="username"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Username"
              id="small"
              required
              minLength={5}
              maxLength={10}
            />
            *
          </div>
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
              required
              minLength={8}
              maxLength={15}
            />
            *
            <input
              type="password"
              name="cpassword"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Confirm Password"
              id="small"
              required
              minLength={8}
              maxLength={15}
            />
            *
          </div>
          <input
            className="email"
            type="text"
            name="email"
            style={{ backgroundColor: "#d9d9d9" }}
            placeholder="E-mail"
            id="small"
            required
            onSubmit={validateEmail}
          />
          *
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

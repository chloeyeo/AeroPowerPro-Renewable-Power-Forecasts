import React, { useState } from "react";
// import axios from "axios";

import { NavBar } from "../../components";
const { axios } = require("axios");
// import "./register.css";

const { registercss } = require("./register.css");

const Register = () => {
  const validateEmail = (value) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnSubmit = (event) => {
    event.preventDefault();

    if (
      validateEmail(formData.email) &&
      formData.password === confirmPassword
    ) {
      console.log("will try posting now!");
      axios({
        method: "post",
        url: "http://127.0.0.1:8000/register/",
        data: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          event.preventDefault();
          window.location.replace("http://127.0.0.1:3000");
          console.log(response);
        })
        .catch(function (error) {
          alert("Credentials already exist.");
          console.log(error);
        });
    } else {
      console.log("invalid!");
      if (!validateEmail(formData.email)) {
        alert("Wrong email format");
      } else {
        alert("Passwords don't match");
      }
    }
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="registercontent"></div>
      <div className="registercontent">
        <form onSubmit={handleOnSubmit}>
          <p className="formtitle">Create an account</p>
          <div>
            <input
              className="namefield small"
              type="text"
              name="username"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Username"
              value={formData.username}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  username: event.target.value,
                })
              }
              required
              minLength={5}
              maxLength={16}
            />
            *
          </div>
          <div>
            <input
              className="namefield small"
              type="text"
              name="fname"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="First Name"
              value={formData.first_name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  first_name: event.target.value,
                })
              }
            />
            <input
              className="namefield small"
              type="text"
              name="lname"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Last Name"
              value={formData.last_name}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  last_name: event.target.value,
                })
              }
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              className="small"
              style={{ backgroundColor: "#d9d9d9" }}
              placeholder="Password"
              value={formData.password}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  password: event.target.value,
                })
              }
              required
              minLength={8}
              maxLength={15}
            />
            *
            <input
              type="password"
              name="cpassword"
              style={{ backgroundColor: "#d9d9d9" }}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm Password"
              className="small"
              required
              minLength={8}
              maxLength={15}
            />
            *
          </div>
          <input
            className="email small"
            type="text"
            value={formData.email}
            onChange={(event) =>
              setFormData({
                ...formData,
                email: event.target.value,
              })
            }
            name="email"
            style={{ backgroundColor: "#d9d9d9" }}
            placeholder="E-mail"
            required
          />
          *
          <input
            className="register"
            type="submit"
            id="register-button"
            value="Register"
            style={{ backgroundColor: "#d9d9d9", color: "#373B44" }}
          />
        </form>
      </div>
    </>
  );
};

export default Register;

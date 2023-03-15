import React, { useState } from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { decodeToken } from "react-jwt";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleOnSubmit = (event) => {
    event.preventDefault();

    console.log("Attempting to post!");
    axios({
      method: "post",
      url: "http://127.0.0.1:8000/login/",
      data: formData,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        event.preventDefault();
        console.log(response);
        const cookies = new Cookies();
        var user = {
          loggedIn: true,
          access: decodeToken(response.data.access),
          refresh: response.data.refresh,
        };
        cookies.set(formData.username, user);
        cookies.set("LoggedInUser", formData.username);
        cookies.set("userIn", "true");
        window.location.replace("/");
      })
      .catch(function (error) {
        alert(" Invalid Credentials");
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <NavBar />
      </div>
      <div
        className="container rounded"
        style={{
          width: "500px",
          height: "500px",
          marginTop: "150px",
          backgroundColor: "#373b44",
        }}
      >
        <h1 className="pt-5 text-white text-center">Welcome</h1>
        <form onSubmit={handleOnSubmit}>
          <div class="p-3 form-group">
            <label className="text-white">Username</label>
            <input
              type="text"
              class="form-control"
              value={formData.username}
              placeholder="Enter username"
              onChange={(event) =>
                setFormData({ ...formData, username: event.target.value })
              }
            />
          </div>
          <div class="p-3 form-group">
            <label className="text-white" for="exampleInputPassword1">
              <p>Password</p>
            </label>
            <input
              type="password"
              class="form-control"
              value={formData.password}
              onChange={(event) =>
                setFormData({ ...formData, password: event.target.value })
              }
              placeholder="Password"
            />
          </div>
          <button
            onClick={() => {}}
            type="submit"
            class="w-100 mt-4 btn btn-light"
          >
            <p>Submit</p>
          </button>
        </form>
        <h5 className="mt-4 text-center text-white">
          <p>Don't have an account yet?</p>
        </h5>
        <Link to="/register">
          <button type="submit" class="w-100 btn text-white">
            <p>Register</p>
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;

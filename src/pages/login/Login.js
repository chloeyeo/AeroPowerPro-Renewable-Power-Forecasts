import React, { useState } from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
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
        window.location.replace("http://127.0.0.1:3000");
        console.log(response);
        alert("Logged In!");
      })
      .catch(function (error) {
        alert(" Login Error");
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
            <label className="text-white" for="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              value={formData.email}
              className="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
            />
          </div>
          <div class="p-3 form-group">
            <label className="text-white" for="exampleInputPassword1">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              className="exampleInputPassword1"
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
            Submit
          </button>
        </form>
        <h5 className="mt-4 text-center text-white">
          Don't have an account yet?
        </h5>
        <Link to="/register">
          <button type="submit" class="w-100 btn text-white">
            Register
          </button>
        </Link>
      </div>
    </>
  );
};

export default Login;

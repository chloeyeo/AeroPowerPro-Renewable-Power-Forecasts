import React from "react";
import { NavBar } from "../../components";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const handleOnSubmit = (event) => {
    event.preventDefault();
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/userProfile/",
      data: {
        username,
        password: passwords[0],
        email,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
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
        <form>
          <div class="p-3 form-group">
            <label className="text-white" for="exampleInputEmail1">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              className="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
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
              placeholder="Password"
            />
          </div>
          <button
            onClick={handleOnSubmit}
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

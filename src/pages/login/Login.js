import React from "react";
import { NavBar } from "../../components";
import axios from "axios";

// replace html form with bootstrap

const Login = () => {
  const handleOnSubmit = (event) => {
    console.log("inside handleOnSubmit in login.js");
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     password: document.getElementById("exampleInputPassword1").value,
    //     email: document.getElementById("exampleInputPassword1").value,
    //   }),
    // };

    // send POST request
    axios
      .post("http://localhost:8000/register_users/", {
        password: document.getElementById("exampleInputPassword1").value,
        email: document.getElementById("exampleInputEmail1").value,
      })
      .then((res) => alert("Form Submitted"))
      // .then(function (response) {
      //   console.log(response);
      // })
      .catch(function (error) {
        console.log(error);
      });
    //event.preventDefault(); // to prevent reloading/refreshing page
    //   fetch("localhost:8000/register_users/", requestOptions)
    //     .then((res) => res.json())
    //     .then((res) => console.log(res));
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
              id="exampleInputEmail1"
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
              id="exampleInputPassword1"
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
        <button type="submit" class="w-100 btn text-white">
          Register
        </button>
      </div>
    </>
  );
};

export default Login;

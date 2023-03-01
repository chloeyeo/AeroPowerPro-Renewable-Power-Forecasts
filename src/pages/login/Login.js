import React, { useState } from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        <h1 className="pt-5 text-white text-center">
          <p>Welcome</p>
        </h1>
        <form>
          <div class="p-3 form-group">
            <label className="text-white" for="exampleInputEmail1">
              <p>Email address</p>
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="p-3 form-group">
            <label className="text-white" for="exampleInputPassword1">
              <p>Password</p>
            </label>
            <input
              type="password"
              id="exampleInputPassword1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
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

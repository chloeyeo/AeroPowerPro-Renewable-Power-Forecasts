import React, { useState } from "react";
import { NavBar } from "../../components";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLogined: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitClick = () => {
    if (
      this.state.email == "testuser@gmail.com" &&
      this.state.password == "testuser123"
    ) {
      this.setState({ isLogined: true });
    }
  };

  render() {
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
                name="login-email"
                class="form-control"
                value={this.state.email}
                onChange={this.handleInputChange}
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
                name="login-password"
                class="form-control"
                className="exampleInputPassword1"
                value={this.state.password}
                onChange={this.handleInputChange}
                placeholder="Password"
              />
            </div>
            <button
              onClick={this.submitClick}
              type="submit"
              class="w-100 mt-4 btn btn-light"
              className="loginSubmitButton"
              data-testid="login-submit"
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
  }
}

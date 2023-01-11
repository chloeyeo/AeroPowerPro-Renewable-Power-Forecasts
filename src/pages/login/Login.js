import React from "react";
import { NavBar } from "../../components";
import axios from "axios";
import { Link } from "react-router-dom";

// replace html form with bootstrap

const Login = () => {
  const handleOnSubmit = (event) => {
    event.preventDefault();
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
    // axios
    //   .post("http://127.0.0.1:8000/userProfile", {
    //     password: document.getElementById("exampleInputPassword1").value,
    //     email: document.getElementById("exampleInputEmail1").value,
    //   })
    //   .then((res) => alert("Form Submitted"))
    //     // console.log(res.data)
    //   // .then(function (response) {
    //   //   console.log(response);
    //   // })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    //event.preventDefault(); // to prevent reloading/refreshing page
    //   fetch("localhost:8000/register_users/", requestOptions)
    //     .then((res) => res.json())
    //     .then((res) => console.log(res));
    // $.post('CSRFTokenManager.do', function(data){
    //   var send = XMLHttpRequest.prototype.send,
    //   token = data;
    //   document.cookie='X-CSRF-Token='+token;
    //   XMLHttpRequest.prototype.send = function(data){
    //     this.setRequestHeader('X-CSRF-Token',token);

    //     return send.apply(this,arguements);
    //   }
    // })

    axios({
      method: "post",
      url: "http://127.0.0.1:8000/userProfile/",
      data: {
        password: "password",
        email: "not an email",
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

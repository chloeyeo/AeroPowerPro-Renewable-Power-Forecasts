import React from "react";
import { NavBar } from "../../components";

var ValidatingForm = React.createClass({
  registerField: function(field) {        
      var fields = this.state.fields;
      fields.push(field);
      this.setState({fields: fields});
  },
  submitForm: function(e) {
      e.preventDefault();
      var validForm = true;
      this.state.fields.forEach(function(field) {
          // just to make sure we don't crash if the field is missing the validation method
          if(typeof field.isValid === "function") {
              var validField = field.isValid();
              validForm = validForm && validField;
          }
      });
      if(validForm) {
          console.log("form is valid");
          // submit the form
      } else {
          console.log("form is invalid");
          // don't submit the form :)
      }
  },
  getInitialState: function() {
      return {fields: []};
  },
render: function() {
      var newChildren = React.Children.map(this.props.children, function(child) {
          // adding our on componentMounted callback
          newChild = React.cloneElement(child, {onComponentMounted: this.registerField});
          return newChild;
      }, this);
  return (<form onSubmit={this.submitForm}>{newChildren}</form>);
}
});

const Login = () => (
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
      <<ValidatingForm id="loginForm">
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
        <button type="submit" class="w-100 mt-4 btn btn-light">
          Submit
        </button>
      </ValidatingForm>
      <h5 className="mt-4 text-center text-white">
        Don't have an account yet?
      </h5>
      <button onclick="register()" type="submit" class="w-100 btn text-white">
        Register
      </button>
    </div>
  </>
);

export default Login;

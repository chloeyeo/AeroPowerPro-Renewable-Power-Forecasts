import React from "react";
import { shallow } from "enzyme";
import Login from "./index";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Test case for testing login", () => {
  let wrapper;
  test("email check", () => {
    wrapper = shallow(<Login />);
    expect(wrapper).toBeTruthy();
    let email = wrapper.find(".exampleInputEmail1");
    expect(email).toBeTruthy();
    email.simulate("change", {
      target: { name: "login-email", value: "testuser@gmail.com" },
    });

    // update wrapper to reflect these changes
    wrapper = wrapper.update();

    expect(wrapper.state("username")).toEqual("testuser@gmail.com");
  });

  test("password check", () => {
    wrapper = shallow(<Login />);
    expect(wrapper).toBeTruthy();
    let password = wrapper.find(".exampleInputPassword1");
    expect(password).toBeTruthy();
    password.simulate("change", {
      target: { name: "login-password", value: "testuser123" },
    });
    // update wrapper to reflect these changes
    wrapper = wrapper.update();
    expect(wrapper.state("password")).toEqual("testuser123");
  });

  test("login check with right data", () => {
    wrapper = shallow(<Login />);
    wrapper.find(".exampleInputEmail1").simulate("change", {
      target: { name: "login-email", value: "testuser@gmail.com" },
    });
    wrapper.find(".exampleInputPassword1").simulate("change", {
      target: { name: "login-password", value: "testuser123" },
    });
    wrapper.find(".loginSubmitButton").simulate("click");
    // update wrapper to reflect these changes
    wrapper = wrapper.update();
    expect(wrapper.state("isLogined")).toBe(true);
  });

  test("login check with wrong data", () => {
    wrapper = shallow(<Login />);
    wrapper.find(".exampleInputEmail1").simulate("change", {
      target: { name: "login-email", value: "testuser@gmail.com" },
    });
    wrapper.find(".exampleInputPassword1").simulate("change", {
      target: { name: "login-password", value: "testuser1234" },
    });
    wrapper.find(".loginSubmitButton").simulate("click");
    // update wrapper to reflect these changes
    wrapper = wrapper.update();
    expect(wrapper.state("isLogined")).toBe(false);
  });
});

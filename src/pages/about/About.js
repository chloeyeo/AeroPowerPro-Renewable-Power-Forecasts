import React from "react";
import { NavBar } from "../../components";

const About = () => (
  <>
    <NavBar />
    <div className="container">
      <h1 className="mt-3">About this website</h1>
      <p>
        The purpose of this website is to provide users interested in renewable
        energy production a convenient way to generate power forecasts with
        various preset power curves as well as power curves that can be created
        by the user. These power forecasts can either be generated for specific
        areas of the UK or for specific windfarms. In addition, users can view
        various details of windfarms all across the UK. This is all made
        possible with an interactive map of the UK on the home page.
      </p>

      <h1 className="mt-5">Team</h1>
      <p>
        Back-end Team:
        <br />
        <br />
        Christoforos Mylona
        <br />
        Tanatapanun Pongkemmanun
        <br />
        Lichao Zhang
        <br />
        <br />
        Front-end Team:
        <br />
        <br />
        George Ntogramatzis
        <br />
        Chloe Yeo
        <br />
        Leonidas Ioannou
        <br />
      </p>
    </div>
  </>
);

export default About;

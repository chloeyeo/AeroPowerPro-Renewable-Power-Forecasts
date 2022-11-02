import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div>
    Hello
    <p>hiasidasi</p>
    <Link to="/signup">
      <button variant="outlined">Sign up</button>
    </Link>
    <Link to="/about">
      <button variant="outlined">about </button>
    </Link>
  </div>
);
export default Home;

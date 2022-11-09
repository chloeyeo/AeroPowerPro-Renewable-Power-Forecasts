import React from "react";
import { NavBar } from "components";
import { SearchBar } from "./components";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Home = () => (
  <div>
    <NavBar />
    <SearchBar />
  </div>
);

<Wrapper apiKey={"AIzaSyD3Q64w0HbCYo-Kl80P-Wbdenv13vSN_U8"} render={Home}>
  <YourComponent />
</Wrapper>;

export default Home;

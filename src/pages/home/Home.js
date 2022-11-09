import React from "react";
import { NavBar } from "components";
import { SearchBar, Map } from "./components";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const Home = () => (
  <div>
    <NavBar />
    <SearchBar />
    <Map />
  </div>
);

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

<Wrapper apiKey={"AIzaSyDIkYrb1DecstIMYjfK9uwzve-g1xFWpxw"} render={render}>
  <Home />
</Wrapper>;

export default Home;

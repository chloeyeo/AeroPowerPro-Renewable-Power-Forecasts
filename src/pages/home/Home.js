import React, { useState, useEffect } from "react";

import { NavBar } from "../../components";
import { AreaSizeMap, WindFarmsMap } from "./components";

const Home = () => {
  const [showWindFarms, setShowWindFarms] = useState(false);

  return (
    <>
      <NavBar />
      <button onClick={() => setShowWindFarms(!showWindFarms)}>
        <h4>SWITCH</h4>
      </button>
      {showWindFarms ? (
        <>
          <h1>Wind Farms</h1>
          <WindFarmsMap />
        </>
      ) : (
        <>
          <h1>AreaSizeMap</h1>
          <AreaSizeMap />
        </>
      )}
    </>
  );
};

export default Home;

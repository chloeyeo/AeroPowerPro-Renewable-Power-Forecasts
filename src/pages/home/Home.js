import React, { useState } from "react";
import "./Switch.css";
import Switch from "./Switch";
import { NavBar } from "../../components";
import { AreaSizeMap, WindFarmsMap } from "./components";
import { Grid } from "@material-ui/core";

const Home = () => {
  const [showWindFarms, setShowWindFarms] = useState(false);

  return (
    <>
      <NavBar />
      <div className="app">
        <Grid container justify="flex-end">
          <Switch
            isOn={showWindFarms}
            onColor="#EF476F"
            handleToggle={() => setShowWindFarms(!showWindFarms)}
          />
        </Grid>
      </div>
      {/* <button onClick={() => setShowWindFarms(!showWindFarms)}>
        <h4>SWITCH</h4>
      </button> */}
      {showWindFarms ? (
        <>
          <Grid align="center">
            <h1 style={{ fontFamily: "fangsong" }}>Wind Farms</h1>
          </Grid>
          <WindFarmsMap />
        </>
      ) : (
        <>
          <Grid align="center">
            <h1 style={{ fontFamily: "fangsong" }}>Area Size Map</h1>
          </Grid>
          <AreaSizeMap />
        </>
      )}
    </>
  );
};

export default Home;

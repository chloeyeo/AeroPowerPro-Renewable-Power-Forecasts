import React, { useState } from "react";
import "./Switch.css";
import Switch from "./Switch";
import { NavBar } from "../../components";
import { AreaSizeMap, WindFarmsMap, SideBar } from "./components";
import { Grid } from "@material-ui/core";
import mapConfig from "./config.json";

const Home = () => {
  const [showWindFarms, setShowWindFarms] = useState(false);
  const [areaSize, setAreaSize] = useState(0.25);
  const [inputCoords, setInputCoords] = useState(center || "");
  const [center, setCenter] = useState(mapConfig.center);
  const [powerCurveData, setPowerCurveData] = useState({
    tableData: [[0, 0]],
    hubHeight: 0,
    numOfTurbines: 0,
    turbineModel: "",
  });

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
      <SideBar
        center={center}
        setCenter={setCenter}
        areaSize={areaSize}
        setAreaSize={setAreaSize}
        inputCoords={inputCoords}
        setInputCoords={setInputCoords}
        powerCurveData={powerCurveData}
        setPowerCurveData={setPowerCurveData}
      />
      {showWindFarms ? (
        <>
          <Grid align="center">
            <h1 style={{ fontFamily: "fangsong" }}>Wind Farms</h1>
          </Grid>
          <WindFarmsMap
            setPowerCurveData={setPowerCurveData}
            center={center}
            powerCurveData={powerCurveData}
          />
        </>
      ) : (
        <>
          <Grid align="center">
            <h1 style={{ fontFamily: "fangsong" }}>Area Size Map</h1>
          </Grid>
          <AreaSizeMap
            setInputCoords={setInputCoords}
            areaSize={areaSize}
            center={center}
            setCenter={setCenter}
          />
        </>
      )}
    </>
  );
};

export default Home;

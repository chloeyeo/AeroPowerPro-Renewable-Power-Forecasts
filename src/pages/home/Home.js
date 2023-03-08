import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { fromLonLat } from "ol/proj";

import { NavBar } from "../../components";

import { geoJsonObject, getWindFarmsReq, getSolarFarmsReq } from "./utils";
import { SideBar, TileLayer, Map, osm } from "./components";

import { ProSidebarProvider } from "react-pro-sidebar";

const Home = () => {
  const [view, setView] = useState("Area Size");
  const [center, setCenter] = useState(["-4.2518", "55.8642"]);
  const [areaSize, setAreaSize] = useState("0.25");
  const [windFarms, setWindFarms] = useState([]);
  const [solarFarms, setSolarFarms] = useState([]);
  const [powerCurveData, setPowerCurveData] = useState({
    tableData: [[0, 0]],
    hubHeight: 0,
    numOfTurbines: 0,
    turbineModel: "",
  });

  useEffect(() => {
    getWindFarmsReq(setWindFarms);
    getSolarFarmsReq(setSolarFarms);
  }, []);

  const displays = {
    "Area Size": null,
    "Core Wind Farms": windFarms.core_windfarm_data,
    "Detail Wind Farms": windFarms.detail_windfarm_data,
    "Solar Farms": solarFarms,
  };

  const currDisplay = displays[view];

  const geoObjects = (view) => {
    switch (view) {
      case "Area Size":
        return geoJsonObject(
          [parseFloat(center[0]), parseFloat(center[1])],
          parseFloat(areaSize) * 0.5,
          view
        );
      case "Solar Farms":
        return currDisplay.map((solarFarm) =>
          geoJsonObject([solarFarm[7], solarFarm[8]], false, view)
        );
      default:
        return currDisplay.map((windFarm) =>
          geoJsonObject(
            [windFarm[1], windFarm[2]],
            windFarm.length !== 10 && 0.05,
            view
          )
        );
    }
  };

  return (
    <>
      <NavBar />

      <ProSidebarProvider>
        <SideBar
          center={center}
          setCenter={setCenter}
          areaSize={areaSize}
          setAreaSize={setAreaSize}
          powerCurveData={powerCurveData}
          setPowerCurveData={setPowerCurveData}
          showWindFarms={view !== "Area Size"}
        />
      </ProSidebarProvider>

      <Grid
        container
        style={{ zIndex: 2, position: "absolute", top: "100px", right: "25px" }}
        justifyContent="flex-end"
      >
        {Object.keys(displays).map((value) => (
          <button key={value} value={value} onClick={(event) => setView(value)}>
            {value}
          </button>
        ))}
      </Grid>

      <div style={{ height: "910px" }}>
        <Map
          view={view}
          farms={currDisplay}
          areaSize={parseFloat(areaSize)}
          center={fromLonLat([parseFloat(center[0]), parseFloat(center[1])])}
          setCenter={setCenter}
          powerCurveData={powerCurveData}
          setPowerCurveData={setPowerCurveData}
        >
          <TileLayer source={osm()} zIndex={0} />
          {geoObjects(view)}
        </Map>
      </div>
    </>
  );
};

export default Home;

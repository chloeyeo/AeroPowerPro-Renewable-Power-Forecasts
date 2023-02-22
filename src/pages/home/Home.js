import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { fromLonLat } from "ol/proj";

import { NavBar } from "../../components";

import { geoJsonObject, getWindFarmsReq } from "./utils";
import { SideBar, Switch, TileLayer, Map, osm } from "./components";

import { ProSidebarProvider } from "react-pro-sidebar";

const Home = () => {
  const [view, setView] = useState("Area Size");
  const [center, setCenter] = useState(["-4.2518", "55.8642"]);
  const [areaSize, setAreaSize] = useState("0.25");
  const [windFarms, setWindFarms] = useState([]);
  const [powerCurveData, setPowerCurveData] = useState({
    tableData: [[0, 0]],
    hubHeight: 0,
    numOfTurbines: 0,
    turbineModel: "",
  });
  const [windFarmData, setWindFarmData] = useState({
    farmName: "",
    id: 0,
    hubHeight: 0,
    numberOfTurbines: 0,
    capacity: 0,
    onshore: false,
  });

  useEffect(() => {
    getWindFarmsReq(setWindFarms);
  }, []);

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
        <button
          value="Area Size"
          onClick={(event) => setView(event.target.value)}
        >
          Area Size
        </button>
        <button
          value="Small Wind Farms"
          onClick={(event) => setView(event.target.value)}
        >
          Small Wind Farms
        </button>
        <button
          value="Large Wind Farms"
          onClick={(event) => setView(event.target.value)}
        >
          Large Wind Farms
        </button>
      </Grid>

      <div style={{ height: "910px" }}>
        <Map
          windFarms={
            view === "Small Wind Farms"
              ? windFarms.small_windfarm_data
              : windFarms.large_windfarm_data
          }
          areaSize={parseFloat(areaSize)}
          center={fromLonLat([parseFloat(center[0]), parseFloat(center[1])])}
          setCenter={setCenter}
          powerCurveData={powerCurveData}
          setPowerCurveData={setPowerCurveData}
          windFarmData={windFarmData}
          setWindFarmData={setWindFarmData}
        >
          <TileLayer source={osm()} zIndex={0} />
          {view !== "Area Size"
            ? (view === "Small Wind Farms"
                ? windFarms.small_windfarm_data
                : windFarms.large_windfarm_data
              ).map((windFarm) =>
                geoJsonObject(
                  [windFarm[1], windFarm[2]],
                  windFarm.length !== 10 && 0.05
                )
              )
            : geoJsonObject(
                [parseFloat(center[0]), parseFloat(center[1])],
                parseFloat(areaSize) * 0.5
              )}
        </Map>
      </div>
    </>
  );
};

export default Home;

import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { fromLonLat } from "ol/proj";

import { NavBar } from "../../components";

import { geoJsonObject, getWindFarmsReq } from "./utils";
import { SideBar, TileLayer, Map, osm } from "./components";

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
  const [windFarmData, setWindFarmData] = useState({});

  useEffect(() => {
    getWindFarmsReq(setWindFarms);
  }, []);

  const displayData =
    view === "Core Wind Farms"
      ? windFarms.core_windfarm_data
      : windFarms.detail_windfarm_data;

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
        {[
          "Area Size",
          "Core Wind Farms",
          "Detail Wind Farms",
          "Solar Farms",
        ].map((value) => (
          <button key={value} value={value} onClick={(event) => setView(value)}>
            {value}
          </button>
        ))}
      </Grid>

      <div style={{ height: "910px" }}>
        <Map
          windFarms={displayData}
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
            ? displayData.map((windFarm) =>
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

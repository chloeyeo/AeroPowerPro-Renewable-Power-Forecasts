import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { fromLonLat } from "ol/proj";

import { NavBar } from "../../components";

import { geoJsonObject, getWindFarmsReq } from "./utils";
import { SideBar, Switch, TileLayer, Map, osm } from "./components";

import { ProSidebarProvider } from "react-pro-sidebar";

const Home = () => {
  const [showWindFarms, setShowWindFarms] = useState(false);
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
          showWindFarms={showWindFarms}
        />
      </ProSidebarProvider>

      <Grid
        container
        style={{ zIndex: 2, position: "absolute" }}
        justifyContent="flex-end"
      >
        <Switch
          isOn={showWindFarms}
          onColor="#EF476F"
          handleToggle={() => setShowWindFarms(!showWindFarms)}
        />
      </Grid>

      <div style={{ height: "910px" }}>
        <Map
          {...(showWindFarms && {
            windFarms,
          })}
          areaSize={parseFloat(areaSize)}
          center={fromLonLat([parseFloat(center[0]), parseFloat(center[1])])}
          setCenter={setCenter}
          powerCurveData={powerCurveData}
          setPowerCurveData={setPowerCurveData}
          windFarmData={windFarmData}
          setWindFarmData={setWindFarmData}
        >
          <TileLayer source={osm()} zIndex={0} />
          {showWindFarms
            ? windFarms.map((windFarm) =>
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

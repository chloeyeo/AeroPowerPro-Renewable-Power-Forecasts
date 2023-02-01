import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { fromLonLat } from "ol/proj";

import { NavBar } from "../../components";

import { geoJsonObject } from "./utils";
import {
  SideBar,
  Switch,
  TileLayer,
  Map,
  osm,
  FullScreenControl,
} from "./components";

import { ProSidebarProvider } from "react-pro-sidebar";

const Home = () => {
  const [showWindFarms, setShowWindFarms] = useState(false);
  const [center, setCenter] = useState(["-4.2518", "55.8642"]);
  const [areaSize, setAreaSize] = useState("0.25");
  const [geolocations, setGeolocations] = useState([]);
  const [powerCurveData, setPowerCurveData] = useState({
    tableData: [[0, 0]],
    hubHeight: 0,
    numOfTurbines: 0,
    turbineModel: "",
  });

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/geolocations/",
    })
      .then(function (response) {
        setGeolocations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
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
        />
      </ProSidebarProvider>

      <Grid container justifyContent="flex-end">
        <Switch
          isOn={showWindFarms}
          onColor="#EF476F"
          style={{ float: "right" }}
          handleToggle={() => setShowWindFarms(!showWindFarms)}
        />
      </Grid>
      <h1 style={{ textAlign: "center", fontFamily: "fangsong" }}>
        {showWindFarms ? "Wind Farms" : "Area Size Map"}
      </h1>

      <div style={{ display: "block", height: `750px` }}>
        <Map
          {...(showWindFarms && {
            geolocations,
          })}
          areaSize={parseFloat(areaSize)}
          center={fromLonLat([parseFloat(center[0]), parseFloat(center[1])])}
          setCenter={setCenter}
          zoom={8}
          powerCurveData={powerCurveData}
          setPowerCurveData={setPowerCurveData}
        >
          <TileLayer source={osm()} zIndex={0} />
          {showWindFarms
            ? geolocations.map((geoLocation) =>
                geoJsonObject([geoLocation[1], geoLocation[2]], 0.05)
              )
            : geoJsonObject(
                [parseFloat(center[0]), parseFloat(center[1])],
                parseFloat(areaSize) * 0.5
              )}
          <FullScreenControl />
        </Map>
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import "./Switch.css";
import Switch from "./Switch";
import { NavBar } from "../../components";
import { AreaSizeMap, WindFarmsMap } from "./components";
import { Grid } from "@material-ui/core";

const Home = () => {
<<<<<<< HEAD
  const [center, setCenter] = useState(mapConfig.center);
  const [areaSize, setAreaSize] = useState(0.25);
  const [geolocations, setGeolocations] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://127.0.0.1:8000/geolocations/",
    })
      .then(function (response) {
        console.log(response);
        setGeolocations(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  let geoObject = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [
            [
              [
                [center[0] - areaSize * 0.5, center[1] + areaSize * 0.5],
                [center[0] + areaSize * 0.5, center[1] + areaSize * 0.5],
                [center[0] + areaSize * 0.5, center[1] - areaSize * 0.5],
                [center[0] - areaSize * 0.5, center[1] - areaSize * 0.5],
              ],
            ],
          ],
        },
      },
    ],
  };
=======
  const [showWindFarms, setShowWindFarms] = useState(false);
>>>>>>> dev-branch

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

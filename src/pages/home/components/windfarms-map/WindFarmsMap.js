import React, { useState, useEffect } from "react";
import GeoJSON from "ol/format/GeoJSON";
import axios from "axios";
import { fromLonLat, get } from "ol/proj";

// import "../../Switch.css";
// import Switch from "../../Switch";
// import { Grid } from "@material-ui/core";

import {
  TileLayer,
  VectorLayer,
  Map,
  osm,
  vector,
  FullScreenControl,
  Styles as FeatureStyles,
} from "../../components";
import mapConfig from "./config.json";

const WindFarmsMap = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [geolocations, setGeolocations] = useState([]);
  const [showWindFarms, setShowWindFarms] = useState(false);

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

  function printMarker(i) {
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
                  [geolocations[i][0] - 0.05, geolocations[i][1] + 0.05],
                  [geolocations[i][0] + 0.05, geolocations[i][1] + 0.05],
                  [geolocations[i][0] + 0.05, geolocations[i][1] - 0.05],
                  [geolocations[i][0] - 0.05, geolocations[i][1] - 0.05],
                ],
              ],
            ],
          },
        },
      ],
    };
    return geoObject;
  }

  const windfarms = (geolocations) => {
    let content = [];

    for (let i = 0; i < geolocations.length; i++) {
      content.push(
        <VectorLayer
          source={vector({
            features: new GeoJSON().readFeatures(printMarker(i), {
              featureProjection: get("EPSG:3857"),
            }),
          })}
          style={FeatureStyles.MultiPolygon}
        />
      );
    }
    return content;
  };

  return (
    <>
      <div style={{ display: "block", height: `750px` }}>
        <Map center={fromLonLat(center)} zoom={8} setCenter={setCenter}>
          <TileLayer source={osm()} zIndex={0} />
          {windfarms(geolocations)}
          {/* <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geoObject, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
            style={FeatureStyles.MultiPolygon}
          /> */}
          <FullScreenControl />
        </Map>
      </div>
    </>
  );
};

export default WindFarmsMap;

import React, { useState, useEffect } from "react";
import GeoJSON from "ol/format/GeoJSON";
import axios from "axios";
import { fromLonLat, get } from "ol/proj";

import {
  SideBar,
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
  const [areaSize, setAreaSize] = useState(1);
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

  //   let geoObject = {
  //     type: "FeatureCollection",
  //     features: [
  //       {
  //         type: "Feature",
  //         geometry: {
  //           type: "MultiPolygon",
  //           coordinates: [
  //             [
  //               [
  //                 [center[0] - areaSize * 0.5, center[1] + areaSize * 0.5],
  //                 [center[0] + areaSize * 0.5, center[1] + areaSize * 0.5],
  //                 [center[0] + areaSize * 0.5, center[1] - areaSize * 0.5],
  //                 [center[0] - areaSize * 0.5, center[1] - areaSize * 0.5],
  //               ],
  //             ],
  //           ],
  //         },
  //       },
  //     ],
  //   };

  return (
    <>
      <div style={{ display: "block", height: `750px` }}>
        <Map center={fromLonLat(center)} zoom={8} setCenter={setCenter}>
          <TileLayer source={osm()} zIndex={0} />

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

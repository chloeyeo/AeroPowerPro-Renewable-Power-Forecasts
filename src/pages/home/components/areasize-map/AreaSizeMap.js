import React, { useState } from "react";
import GeoJSON from "ol/format/GeoJSON";
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

const AreaSizeMap = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [areaSize, setAreaSize] = useState(0.25);

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

  return (
    <>
      <SideBar
        center={center}
        setCenter={setCenter}
        areaSize={areaSize}
        setAreaSize={setAreaSize}
      />
      <div style={{ display: "block", height: `750px` }}>
        <Map center={fromLonLat(center)} zoom={8} setCenter={setCenter}>
          <TileLayer source={osm()} zIndex={0} />

          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(geoObject, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
            style={FeatureStyles.MultiPolygon}
          />
          <FullScreenControl />
        </Map>
      </div>
    </>
  );
};

export default AreaSizeMap;

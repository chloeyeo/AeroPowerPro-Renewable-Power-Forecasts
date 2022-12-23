import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import * as olProj from "ol/proj";

const Map = ({ children, zoom, center, setCenter }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  // on component mount
  useEffect(() => {
    let options = {
      view: new ol.View({
        zoom,
        center,
        extent: [-1500000, 6200000, 600000, 8800000],
      }),

      layers: [],
      controls: [],
      overlays: [],
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef.current);
    setMap(mapObject);
    mapObject.on("click", function (evt) {
      setCenter([
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[0],
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[1],
      ]);
    });

    return () => mapObject.setTarget(undefined);
  }, [center]);

  // zoom change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setZoom(zoom);
  }, [zoom]);

  // center change handler
  useEffect(() => {
    if (!map) return;

    map.getView().setCenter();
  }, [center]);

  return (
    <MapContext.Provider value={{ map }}>
      <div
        ref={mapRef}
        style={{ display: "block", height: "100%" }}
        className="ol-map"
      >
        {children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;

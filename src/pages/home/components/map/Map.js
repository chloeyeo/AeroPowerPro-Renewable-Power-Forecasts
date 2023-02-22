import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import * as ol from "ol";
import * as olProj from "ol/proj";
import MapContext from "./MapContext";
import { FarmPopup } from "./components";
import { farmDataByAreaReq, updateWindFarmData } from "./utils";

const Map = ({
  children,
  zoom,
  areaSize,
  center,
  setCenter,
  geolocations,
  powerCurveData,
  setPowerCurveData,
  setWindFarmData,
  windFarmData,
}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isShown, setIsShown] = useState(false);

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
      evt.preventDefault();
      const coords = olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326");
      if (geolocations) {
        updateWindFarmData(
          geolocations,
          coords,
          powerCurveData,
          setPowerCurveData,
          setIsShown,
          setWindFarmData
        );
      } else {
        farmDataByAreaReq(coords, areaSize, powerCurveData, setPowerCurveData);
      }
      setCenter(coords.map((coord) => coord.toFixed(2)));
    });

    return () => mapObject.setTarget(undefined);
  }, [center]);

  return (
    <>
      {isShown && (
        <FarmPopup setIsShown={setIsShown} farmdetails={windFarmData} />
      )}
      <MapContext.Provider value={{ map }}>
        <div
          ref={mapRef}
          style={{ display: "block", height: "100%" }}
          className="ol-map"
        >
          {children}
        </div>
      </MapContext.Provider>
    </>
  );
};

export default Map;

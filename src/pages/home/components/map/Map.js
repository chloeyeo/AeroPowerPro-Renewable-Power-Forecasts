import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import * as ol from "ol";
import * as olProj from "ol/proj";
import MapContext from "./MapContext";
import { FarmPopup } from "./components";
import { farmDataByAreaReq, updateWindFarmData } from "./utils";

const Map = ({
  children,
  areaSize,
  center,
  setCenter,
  view,
  farms,
  powerCurveData,
  setPowerCurveData,
  setWindFarmData,
  windFarmData,
}) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [isShown, setIsShown] = useState(false);
  const [farmPopupData, setFarmPopupData] = useState({});

  useEffect(() => {
    let options = {
      view: new ol.View({
        zoom: 8,
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
      if (view === "Area Size") {
        farmDataByAreaReq(coords, areaSize, powerCurveData, setPowerCurveData);
      } else {
        updateWindFarmData(
          view,
          farms,
          coords,
          setIsShown,
          setFarmPopupData,
          powerCurveData,
          setPowerCurveData
        );
      }
      setCenter(coords.map((coord) => coord.toFixed(2)));
    });

    return () => mapObject.setTarget(undefined);
  }, [center]);

  return (
    <>
      {isShown && (
        <FarmPopup setIsShown={setIsShown} farmdetails={farmPopupData} />
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

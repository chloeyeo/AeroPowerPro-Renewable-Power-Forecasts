import React, { useRef, useState, useEffect } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import * as olProj from "ol/proj";

const Map = ({
  children,
  zoom,
  center,
  setCenter,
  setInputCoords,
  geolocations,
  powerCurveData,
  setPowerCurveData,
}) => {
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
      evt.preventDefault();
      if (geolocations) {
        const coords = [
          olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[0],
          olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[1],
        ];
        const windFarmClicked = geolocations.find(
          (geolocation) =>
            geolocation[1] - 0.05 < coords[0] &&
            geolocation[1] + 0.05 > coords[0] &&
            geolocation[2] - 0.05 < coords[1] &&
            geolocation[2] + 0.05 > coords[1]
        );
        if (windFarmClicked) {
          setPowerCurveData({
            ...powerCurveData,
            hubHeight: windFarmClicked[3],
            numOfTurbines: windFarmClicked[4],
          });
          alert(
            `Windfarm ID: ${windFarmClicked[0]}\nHub Height: ${windFarmClicked[3]}\nNumber of turbines: ${windFarmClicked[4]}\nTurbine Capacity: ${windFarmClicked[5]}\nIs onshore?: ${windFarmClicked[6]}\n`
          );
        }
      }
      const newCoords = [
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[0],
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[1],
      ];
      setInputCoords &&
        setInputCoords(newCoords.map((coord) => coord.toFixed(2)));
      setCenter && setCenter(newCoords);
    });

    return () => mapObject.setTarget(undefined);
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

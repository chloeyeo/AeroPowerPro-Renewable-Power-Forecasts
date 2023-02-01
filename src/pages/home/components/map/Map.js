import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import * as olProj from "ol/proj";

const Map = ({
  children,
  zoom,
  areaSize,
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
      const coords = [
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[0],
        olProj.transform(evt.coordinate, "EPSG:3857", "EPSG:4326")[1],
      ];
      if (geolocations) {
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
      } else {
        axios({
          method: "post",
          url: "http://127.0.0.1:8000/farm_data_by_area/",
          data: {
            max_latitude: coords[1] + areaSize * 0.5,
            min_latitude: coords[1] - areaSize * 0.5,
            max_longitude: coords[0] + areaSize * 0.5,
            min_longitude: coords[0] - areaSize * 0.5,
          },
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            console.log("farmed data by area!", response.data);
            setPowerCurveData({
              ...powerCurveData,
              hubHeight: response.data.average_hub_height.toFixed(2),
              numOfTurbines: response.data.total_turbines,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      setInputCoords && setInputCoords(coords.map((coord) => coord.toFixed(2)));
      setCenter && setCenter(coords);
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

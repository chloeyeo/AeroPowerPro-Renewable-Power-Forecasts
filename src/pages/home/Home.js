import React, { useState } from "react";
import { NavBar } from "../../components";
import {
  SideBar,
  SearchBar,
  Layers,
  TileLayer,
  VectorLayer,
  Map,
} from "./components";

import { osm, vector } from "./components/source";
import { Controls, FullScreenControl } from "./components/controls";
import FeatureStyles from "./components/features/Styles";

import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

import mapConfig from "./config.json";
import { set } from "ol/transform";

const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const Home = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(true);
  const [showLayer2, setShowLayer2] = useState(true);
  const [showMarker, setShowMarker] = useState(false);
  const [areaSize, setAreaSize] = useState(0.1);

  const [features, setFeatures] = useState(addMarkers(markersLonLat));

  return (
    <>
      <NavBar />
      <SideBar
        center={center}
        setCenter={setCenter}
        areaSize={areaSize}
        setAreaSize={setAreaSize}
      />
      <div style={{ display: "block", height: "700px" }}>
        <Map styles={{}} center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {showMarker && <VectorLayer source={vector({ features })} />}
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
      </div>
    </>
  );
};

export default Home;

import React from "react";
import GeoJSON from "ol/format/GeoJSON";
import { get } from "ol/proj";

import { VectorLayer, vector, Styles as FeatureStyles } from "../components";

const geoJsonObject = (point, offset, type) => (
  <VectorLayer
    source={vector({
      features: new GeoJSON().readFeatures(
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: offset ? "MultiPolygon" : "Point",
                coordinates: offset
                  ? [
                      [
                        [
                          [point[0] - offset, point[1] + offset],
                          [point[0] + offset, point[1] + offset],
                          [point[0] + offset, point[1] - offset],
                          [point[0] - offset, point[1] - offset],
                        ],
                      ],
                    ]
                  : point,
              },
            },
          ],
        },
        {
          featureProjection: get("EPSG:3857"),
        }
      ),
    })}
    style={
      offset
        ? FeatureStyles.MultiPolygon
        : type === "Solar Farms"
        ? FeatureStyles.Point
        : FeatureStyles.Point.image
    }
  />
);

export default geoJsonObject;

import React from "react";
import GeoJSON from "ol/format/GeoJSON";
import { get } from "ol/proj";

import { VectorLayer, vector, Styles as FeatureStyles } from "../components";

const geoJsonObject = (point, offset) =>
  offset ? (
    <VectorLayer
      source={vector({
        features: new GeoJSON().readFeatures(
          {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "MultiPolygon",
                  coordinates: [
                    [
                      [
                        [point[0] - offset, point[1] + offset],
                        [point[0] + offset, point[1] + offset],
                        [point[0] + offset, point[1] - offset],
                        [point[0] - offset, point[1] - offset],
                      ],
                    ],
                  ],
                },
              },
            ],
          },
          {
            featureProjection: get("EPSG:3857"),
          }
        ),
      })}
      style={FeatureStyles.MultiPolygon}
    />
  ) : (
    <VectorLayer
      source={vector({
        features: new GeoJSON().readFeatures(
          {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: point,
                },
              },
            ],
          },
          {
            featureProjection: get("EPSG:3857"),
          }
        ),
      })}
      style={FeatureStyles.Point.image}
    />
  );

export default geoJsonObject;

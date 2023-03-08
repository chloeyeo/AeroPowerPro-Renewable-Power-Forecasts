import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
  Point: new Style({
    image: new CircleStyle({
      radius: 8,
      stroke: new Stroke({
        color: "orange",
        width: 2,
      }),
      fill: new Fill({
        color: "rgba(255, 165, 0, 0.1)",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};

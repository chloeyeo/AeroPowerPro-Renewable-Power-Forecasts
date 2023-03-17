import React from "react";
import { Grid } from "@material-ui/core";
import moment from "moment";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Button from "react-bootstrap/Button";

const ForecastGraph = ({ setIsShown, powerForecast }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            borderRadius: "8px",
            padding: "4px",
            backgroundColor: "white",
          }}
          className="custom-tooltip"
        >
          <p className="label">{`${label} hours - ${payload[0].value.toFixed(
            2
          )} MegaWatts`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <div
      display="flex"
      style={{
        backgroundColor: "white",
        width: "650px",
        height: "475px",
      }}
    >
      <Grid container justifyContent="space-between">
        <div></div>
        <h5 style={{ textAlign: "center" }}>
          Power Production (MW) for next 5 days
        </h5>
        <Button
          style={{ float: "right" }}
          variant="outline-secondary"
          className="button-addon2"
          onClick={() => {
            setIsShown(false);
          }}
        >
          X
        </Button>
      </Grid>
      <div
        style={{
          width: "625px",
          height: "410px",
          borderRadius: "4px",
        }}
        className="linechart-wrapper"
      >
        <LineChart
          width={600}
          height={400}
          style={{
            float: "right",
          }}
          data={powerForecast.map((pair) => ({
            time: moment(pair[0]).diff(moment(), "hours"),
            power: pair[1] / 1000,
          }))}
          background="#fff"
        >
          <Line dot={false} type="monotone" dataKey="power" stroke="#8884d8" />

          <CartesianGrid stroke="#ccc" unit="MW" strokeDasharray="5 5" />
          <XAxis
            label={{ value: "Time (h)", position: "insideBottom" }}
            dataKey="time"
            unit="h"
            ticks={[24, 48, 72, 96, 120, 144]}
          />
          <YAxis
            label={{
              value: "Power (MW)",
              angle: -90,
              position: "insideLeft",
            }}
            type="number"
          />
          <Tooltip content={CustomTooltip} />
        </LineChart>
      </div>
    </div>
  );
};

export default ForecastGraph;

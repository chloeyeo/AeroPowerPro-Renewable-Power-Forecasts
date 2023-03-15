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

const HistoricDataGraph = ({ setShowHistoric, historicData }) => {
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
          <p className="label">{`${
            payload[0].payload.date
          } - ${payload[0].value.toFixed(2)} ${
            historicData.type === "solar" ? "MW" : "m/s"
          }`}</p>
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
        <h5 style={{ textAlign: "center" }}>Historic Wind Speeds</h5>
        <Button
          style={{ float: "right" }}
          variant="outline-secondary"
          className="button-addon2"
          onClick={() => {
            setShowHistoric(false);
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
          data={
            historicData.data &&
            historicData.data.map((pair) => ({
              date: moment(pair[0]).format("MMMM Do YYYY, h:mm a"),
              value: pair[1],
            }))
          }
          background="#fff"
        >
          <Line dot={false} type="monotone" dataKey="value" stroke="#8884d8" />

          <CartesianGrid
            stroke="#ccc"
            unit={historicData.type === "solar" ? "MW" : "m/s"}
            strokeDasharray="5 5"
          />
          <XAxis
            label={{ value: "Date", position: "insideBottom" }}
            dataKey="date"
            tick={false}
          />
          <YAxis
            label={{
              value: "Wind Speed (m/s)",
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

export default HistoricDataGraph;

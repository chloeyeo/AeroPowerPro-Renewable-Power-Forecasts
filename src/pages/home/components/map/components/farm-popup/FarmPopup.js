import { Grid } from "@material-ui/core";
import React from "react";
import Button from "react-bootstrap/Button";

const FarmPopup = ({ setIsShown, farmdetails }) => {
  const convertSnakeCase = (variable) =>
    variable
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <div
      display="flex"
      style={{
        padding: 10,
        position: "absolute",
        zIndex: 3,
        background: "white",
        opacity: 0.8,
        width: "350px",
        left: "250px",
        borderRadius: "15px",
      }}
    >
      <Grid container justifyContent="space-between">
        <h5>Wind Farm Details</h5>
        <Button
          style={{
            position: "relative",
            top: "10px",
            right: "10px",
          }}
          variant="outline-secondary"
          className="button-addon2"
          onClick={() => setIsShown(false)}
        >
          X
        </Button>
      </Grid>
      <div>
        {Object.entries(farmdetails).map(([key, value]) => (
          <div key={key}>
            {convertSnakeCase(key)}:{" "}
            {typeof value == "boolean" ? value.toString() : value || "____"}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmPopup;

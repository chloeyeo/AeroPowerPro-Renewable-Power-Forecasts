import { Grid } from "@material-ui/core";
import React from "react";
import Button from "react-bootstrap/Button";

const FarmPopup = ({ setIsShown, farmdetails }) => {
  if (farmdetails.farmName === null) {
    farmdetails.farmName = "Unnamed Windfarm";
  }
  let shr = "Offshore";
  if (farmdetails.onshore === true) {
    shr = "Onshore";
  }
  return (
    <div
      display="flex"
      style={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "white",
        width: "300px",
        height: "160px",
        left: "250px",
      }}
    >
      <Grid container justifyContent="space-between">
        <div></div>
        <h5 style={{ textAlign: "center" }}>{farmdetails.farmName}</h5>
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
      >
        Windfarm ID: {farmdetails.id} <br />
        Hub height: {farmdetails.hubHeight} <br />
        Number of Turbines: {farmdetails.numberOfTurbines} <br />
        Turbine Capacity: {farmdetails.capacity / 1000000}MW <br />
        {shr}
      </div>
    </div>
  );
};

export default FarmPopup;

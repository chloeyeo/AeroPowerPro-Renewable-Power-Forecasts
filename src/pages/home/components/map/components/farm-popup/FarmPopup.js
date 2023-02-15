import { Grid } from "@material-ui/core";
import React from "react";
import Button from "react-bootstrap/Button";

const FarmPopup = ({ setIsShown, farmdetails }) => {
  if (farmdetails.farmName == null) {
    farmdetails.farmName = "Unnamed Windfarm";
  }
  let shr = "Offshore";
  if (farmdetails.onshore == true) {
    shr = "Onshore";
  }
  return (
    <div
      display="flex"
      style={{
        position: "absolute",
        zIndex: 2,
        backgroundColor: "rgba(255,255,255,0.65)",
        width: "300px",
        height: "160px",
        left: "250px",
        borderRadius: "15px",
      }}
    >
      <Grid container justifyContent="space-between">
        <div></div>
        <h5 style={{ textAlign: "center", opacity: "100%" }}>
          {farmdetails.farmName}
        </h5>
        <Button
          style={{
            position: "relative",
            top: "10px",
            right: "10px",
            opacity: "100%",
          }}
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
          width: "300px",
          height: "140px",
          borderRadius: "4px",
          paddingLeft: "15px",
          paddingBottom: "10px",
          opacity: "100%",
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

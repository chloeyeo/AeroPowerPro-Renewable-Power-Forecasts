import { Grid } from "@material-ui/core";
import React from "react";
import Button from "react-bootstrap/Button";

const FarmPopup = ({ setIsShown, farmdetails }) => {
  if (farmdetails.farmName === null) {
    farmdetails.farmName = "Unnamed Windfarm";
  }

  return (
    <div
      display="flex"
      style={{
        position: "absolute",
        zIndex: 3,
        backgroundColor: "rgba(255,255,255,0.75)",
        width: "300px",
        height: "360px",
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
          width: "600px",
          height: "140px",
          borderRadius: "4px",
          paddingLeft: "15px",
          paddingBottom: "10px",
          opacity: "100%",
        }}
      >
        {Object.entries(farmdetails).map(([key, value]) => (
          <div key={key}>
            {key} : {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FarmPopup;

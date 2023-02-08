import React from "react";

const withInputFieldProps = (Component) => (props) => {
  const {
    center,
    areaSize,
    setCenter,
    setAreaSize,
    powerCurveData,
    setPowerCurveData,
  } = props;

  const inputFieldProps = [
    {
      title: "Hub Height",
      minVal: 0,
      defaultValue: powerCurveData.hubHeight,
      updateFunc: (newVal) =>
        setPowerCurveData({
          ...powerCurveData,
          hubHeight: newVal,
        }),
    },
    {
      title: "Num of turbines",
      minVal: 0,
      defaultValue: powerCurveData.numOfTurbines,
      updateFunc: (newVal) =>
        setPowerCurveData({
          ...powerCurveData,
          numOfTurbines: newVal,
        }),
    },
    {
      title: "Latitude",
      minVal: 50,
      maxVal: 59,
      defaultValue: center[1],
      updateFunc: (newVal) => setCenter([center[0], newVal]),
    },
    {
      title: "Longitude",
      minVal: -7,
      maxVal: 4,
      defaultValue: center[0],
      updateFunc: (newVal) => setCenter([newVal, center[1]]),
    },
    {
      title: "Area Size",
      minVal: 0.25,
      maxVal: 5,
      defaultValue: areaSize,
      updateFunc: (newVal) => setAreaSize(newVal),
    },
  ];

  return <Component {...props} inputFieldProps={inputFieldProps} />;
};

export default withInputFieldProps;

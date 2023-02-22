const updateWindFarmData = (
  geolocations,
  coords,
  setPowerCurveData,
  powerCurveData,
  setIsShown,
  setWindFarmData
) => {
  const windFarmClicked = geolocations.find(
    (geolocation) =>
      geolocation[1] - 0.05 < coords[0] &&
      geolocation[1] + 0.05 > coords[0] &&
      geolocation[2] - 0.05 < coords[1] &&
      geolocation[2] + 0.05 > coords[1]
  );
  if (windFarmClicked) {
    setPowerCurveData({
      ...powerCurveData,
      hubHeight: windFarmClicked[3],
      numOfTurbines: windFarmClicked[4],
    });
    setIsShown(true);
    setWindFarmData({
      farmName: "Windfarm",
      id: windFarmClicked[0],
      hubHeight: windFarmClicked[3],
      numberOfTurbines: windFarmClicked[4],
      capacity: windFarmClicked[5],
      onshore: windFarmClicked[6],
    });
  }
};

export { updateWindFarmData };

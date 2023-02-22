const updateWindFarmData = (
  geolocations,
  coords,
  powerCurveData,
  setPowerCurveData,
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
    const large = windFarmClicked.length === 10;
    if (windFarmClicked) {
      setPowerCurveData({
        ...powerCurveData,
        hubHeight: windFarmClicked[large ? 6 : 3],
        numOfTurbines: windFarmClicked[large ? 7 : 4],
      });
      setIsShown(true);
      large
        ? setWindFarmData({
            id: windFarmClicked[0],
            latitude: windFarmClicked[1].toFixed(2),
            longitude: windFarmClicked[2].toFixed(2),
            operator: windFarmClicked[3],
            sitename: windFarmClicked[4],
            is_onshore: windFarmClicked[5],
            turbine_height: windFarmClicked[6],
            number_of_turbines: windFarmClicked[7],
            turbine_capcity: windFarmClicked[8],
            development_status: windFarmClicked[9],
          })
        : setWindFarmData({
            farmName: "Windfarm",
            id: windFarmClicked[0],
            hubHeight: windFarmClicked[3],
            numberOfTurbines: windFarmClicked[4],
            capacity: windFarmClicked[5],
            onshore: windFarmClicked[6],
          });
    }
  }
};

export { updateWindFarmData };

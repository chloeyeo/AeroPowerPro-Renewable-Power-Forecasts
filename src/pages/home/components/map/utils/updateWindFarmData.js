const updateWindFarmData = (
  view,
  farms,
  coords,
  setIsShown,
  setFarmPopupData,
  powerCurveData,
  setPowerCurveData
) => {
  const coordinateIndex = view === "Solar Farms" ? 7 : 1;
  console.log("Test", farms[0]);
  const farmClicked = farms.find(
    (farm) =>
      farm[coordinateIndex] - 0.05 < coords[0] &&
      farm[coordinateIndex] + 0.05 > coords[0] &&
      farm[coordinateIndex + 1] - 0.05 < coords[1] &&
      farm[coordinateIndex + 1] + 0.05 > coords[1]
  );

  if (farmClicked) {
    setIsShown(true);
    if (view === "Solar Farms") {
      setFarmPopupData({
        operator: farmClicked[0],
        sitename: farmClicked[1],
        development_status: farmClicked[2],
        mounting_type: farmClicked[3],
        address: farmClicked[4],
        region: farmClicked[5],
        country: farmClicked[6],
        longitude: farmClicked[7],
        latitude: farmClicked[8],
      });
    } else {
      const isCoreWindFarms = view === "Core Wind Farms";
      setPowerCurveData({
        ...powerCurveData,
        hubHeight: farmClicked[isCoreWindFarms ? 3 : 8],
        numOfTurbines: farmClicked[isCoreWindFarms ? 4 : 7],
      });
      if (isCoreWindFarms) {
        setFarmPopupData({
          id: farmClicked[0],
          longitude: farmClicked[1].toFixed(2),
          latitude: farmClicked[2].toFixed(2),
          operator: farmClicked[3],
          sitename: farmClicked[4],
          is_onshore: farmClicked[5],
          megawatt_capacity: farmClicked[6],
          number_of_turbines: farmClicked[7],
          turbine_height: farmClicked[8],
          development_status: farmClicked[9],
        });
      } else {
        setFarmPopupData({
          id: farmClicked[0],
          hub_height: farmClicked[3],
          number_of_turbines: farmClicked[4],
          megawatt_capacity: farmClicked[5] / 1000000,
          is_onshore: farmClicked[6],
        });
      }
    }
  }
};

export { updateWindFarmData };

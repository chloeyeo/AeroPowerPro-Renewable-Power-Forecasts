import axios from "axios";

const farmDataByAreaReq = (
  coords,
  areaSize,
  powerCurveData,
  setPowerCurveData
) => {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/farm_data_by_area/",
    data: {
      max_latitude: coords[1] + areaSize * 0.5,
      min_latitude: coords[1] - areaSize * 0.5,
      max_longitude: coords[0] + areaSize * 0.5,
      min_longitude: coords[0] - areaSize * 0.5,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      const newHubHeight = response.data.average_hub_height;
      const averageHubHeight = Array.isArray(newHubHeight)
        ? (
            newHubHeight.reduce((total, acc) => total + acc, 0) /
            newHubHeight.length
          ).toFixed(2)
        : newHubHeight.toFixed(2);

      setPowerCurveData({
        ...powerCurveData,
        hubHeight: averageHubHeight,
        numOfTurbines: response.data.total_turbines,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { farmDataByAreaReq };

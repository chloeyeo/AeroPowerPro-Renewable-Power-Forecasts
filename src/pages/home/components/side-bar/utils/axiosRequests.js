import axios from "axios";

const geoLocReq = (setTurbineModels) => {
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/generic_wind_turbines/",
  })
    .then(function (response) {
      setTurbineModels(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const forecastReq = (powerCurveData, center, setPowerForecast, setIsShown) => {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/generate_power_forecast/",
    data: {
      tableData: powerCurveData.tableData.map((pair) => [
        parseFloat(pair[0]),
        parseFloat(pair[1]),
      ]),
      hubHeight: parseFloat(powerCurveData.hubHeight),
      numOfTurbines: parseFloat(powerCurveData.numOfTurbines),
      latitude: parseFloat(center[1]),
      longitude: parseFloat(center[0]),
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      setPowerForecast(response.data.power_forecast);
      setIsShown(true);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getHistoricWindSpeedsReq = (setHistoricWindSpeeds, dates, center) => {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/historic_wind_data/",
    data: {
      start_date: dates.startDate,
      end_date: dates.endDate,
      latitude: parseFloat(center[0]),
      longitude: parseFloat(center[1]),
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      setHistoricWindSpeeds(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { geoLocReq, forecastReq, getHistoricWindSpeedsReq };

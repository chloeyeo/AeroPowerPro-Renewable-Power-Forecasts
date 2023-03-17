import axios from "axios";

const getWindFarmsReq = (setWindFarms) => {
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/geolocations/",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      setWindFarms(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const getSolarFarmsReq = (setSolarFarms) => {
  axios({
    method: "get",
    url: "http://127.0.0.1:8000/solar_farm_geolocation_view/",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      setSolarFarms(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { getWindFarmsReq, getSolarFarmsReq };

import axios from "axios";

const getWindFarmsReq = (setWindFarms) => {
  axios({
    method: "post",
    url: "http://127.0.0.1:8000/geolocations/",
    data: {
      small: true,
    },
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      setWindFarms([
        ...response.data.small_windfarm_data,
        ...response.data.large_windfarm_data,
      ]);
    })
    .catch(function (error) {
      console.log(error);
    });
};

export { getWindFarmsReq };

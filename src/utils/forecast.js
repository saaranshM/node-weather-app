const axios = require("axios");

const access_key = "0c307cc09c0d0361ea3c5960689c3481";

const forecast = (lat, long, callback) => {
  const weather_url = "http://api.weatherstack.com/current";

  axios
    .get(weather_url, {
      params: {
        access_key,
        query: lat + "," + long,
      },
    })
    .then(({ status, data }) => {
      if (status == 200) {
        callback(undefined, {
          lineOne: `${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out and it feels like ${data.current.feelslike} degrees out.`,
          lineTwo: `With humdity of ${data.current.humidity}.`,
        });
      } else {
        callback("API Error!");
      }
    })
    .catch((e) => {
      callback("User Error!");
    });
};

module.exports = forecast;

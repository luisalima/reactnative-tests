'use strict';

// API Key
let APP_ID = 'appid=2cb886bf824ad74ca3c35e422b614bf8';

// Base API call for any query
let API_CALL = 'http://api.openweathermap.org/data/2.5';

// Current weather data API.
let API = {

  /**
  * Fetch weather by city name.
  */
  fetchWeatherByCityName: function(city, units) {
    let url = `${API_CALL}/find?q=${city}&units=${units}&${APP_ID}`;
    return fetch(url).then((response) => response.json());
  },

  /**
  * Fetch weather by geographic coordinates.
  */
  fetchWeatherByGeoCoords: function(coords, units) {
    let url = `${API_CALL}/weather?lat=${coords.latitude}&lon=${coords.longitude}&units=${units}&${APP_ID}`;
    console.log(url);
    return fetch(url).then((response) => response.json());
  }
};

module.exports = API;

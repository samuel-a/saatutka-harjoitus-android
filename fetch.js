import * as api from "./fetch-api.js";
import * as mock from "./fetch-mock.js";
import * as config from "./api-config.json";

let fetch;
if (config.MOCK) {
  console.log(
    "Using mock API."
  );
  fetch = mock;
} else {
  fetch = api;
}

export const fetchCurrentWeather = fetch.fetchCurrentWeather;
export const fetchForecast = fetch.fetchForecast;

// TESTING MIRROR FOR fetch.js, avoids getting blocked by the api for fetching
// too much.

class CurrentData {
    constructor(
      city,
      icon,
      temperature,
      description,
      wind_speed,
      date,
      humidity,
      time,
      precipitation = "" //empty if info not available
    ) {
      this.city = city;
      this.icon = icon;
      this.temperature = temperature;
      this.description = description;
      this.wind_speed = wind_speed;
      this.date = date;
      this.humidity = humidity;
      this.time = time;
      this.precipitation = precipitation;
    }
  }
  
  // Simple container class for holding a single weather forecast i.e. a weather
  // some time in the future.
  class ForecastData {
    constructor(
      icon,
      temperature,
      wind_speed,
      humidity,
      time,
      precipitation = "" //empty if info not available
    ) {
      this.icon = icon;
      this.temperature = temperature;
      this.wind_speed = wind_speed;
      this.humidity = humidity;
      this.time = time;
      this.precipitation = precipitation;
    }
  }
  
  async function fetchCurrentWeather(city) {
    // Placeholder response to avoid fetching too much during development
    const response = {
      coord: { lon: 24.9355, lat: 60.1695 },
      weather: [{ id: 601, main: "Snow", description: "lumi", icon: "13n" }],
      base: "stations",
      main: {
        temp: 273.36,
        feels_like: 269.82,
        temp_min: 271.63,
        temp_max: 273.92,
        pressure: 974,
        humidity: 97,
      },
      visibility: 2500,
      wind: { speed: 3.09, deg: 340 },
      snow: { "1h": 0.82 },
      clouds: { all: 75 },
      dt: 1642693952,
      sys: {
        type: 2,
        id: 2036194,
        country: "FI",
        sunrise: 1642662061,
        sunset: 1642687262,
      },
      timezone: 7200,
      id: 658225,
      name: "Helsinki",
      cod: 200,
    };
  
    const dt = new Date(response.dt * 1000);
    const _time = `${("0" + dt.getHours()).slice(-2)}:${(
      "0" + dt.getMinutes()
    ).slice(-2)}`;
    const _date = dt.toLocaleDateString("fi-FI", {
      day: "numeric",
      month: "long",
    }); //format(dt, "do MMMM", { locale: fi });
    return new CurrentData(
      city,
      response.weather[0].icon,
      response.main.temp - 273.15, // transform to celsius
      response.weather[0].description,
      response.wind.speed,
      _date,
      response.main.humidity,
      _time,
      typeof response.precipitation === "undefined"
        ? "--"
        : response.precipitation //empty if info not available
    );
  }
  
  async function fetchForecast(city) {
    // Placeholder to avoid fetching too much during development
    const response = {
      cod: "200",
      message: 0,
      cnt: 6,
      list: [
        {
          dt: 1642701600,
          main: {
            temp: 270.26,
            feels_like: 263.7,
            temp_min: 269.44,
            temp_max: 270.26,
            pressure: 990,
            sea_level: 990,
            grnd_level: 976,
            humidity: 82,
            temp_kf: 0.82,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04n" },
          ],
          clouds: { all: 100 },
          wind: { speed: 6.64, deg: 350, gust: 15.54 },
          visibility: 10000,
          pop: 0.51,
          sys: { pod: "n" },
          dt_txt: "2022-01-20 18:00:00",
        },
        {
          dt: 1642712400,
          main: {
            temp: 270.07,
            feels_like: 263.26,
            temp_min: 269.77,
            temp_max: 270.07,
            pressure: 992,
            sea_level: 992,
            grnd_level: 978,
            humidity: 81,
            temp_kf: 0.3,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04n" },
          ],
          clouds: { all: 100 },
          wind: { speed: 7.03, deg: 351, gust: 15.72 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2022-01-20 21:00:00",
        },
        {
          dt: 1642723200,
          main: {
            temp: 270.33,
            feels_like: 263.42,
            temp_min: 270.33,
            temp_max: 270.33,
            pressure: 996,
            sea_level: 996,
            grnd_level: 981,
            humidity: 79,
            temp_kf: 0,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04n" },
          ],
          clouds: { all: 100 },
          wind: { speed: 7.4, deg: 355, gust: 16.72 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2022-01-21 00:00:00",
        },
        {
          dt: 1642734000,
          main: {
            temp: 269.86,
            feels_like: 262.87,
            temp_min: 269.86,
            temp_max: 269.86,
            pressure: 999,
            sea_level: 999,
            grnd_level: 983,
            humidity: 75,
            temp_kf: 0,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04n" },
          ],
          clouds: { all: 100 },
          wind: { speed: 7.29, deg: 350, gust: 16.46 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2022-01-21 03:00:00",
        },
        {
          dt: 1642744800,
          main: {
            temp: 268.97,
            feels_like: 261.97,
            temp_min: 268.97,
            temp_max: 268.97,
            pressure: 1001,
            sea_level: 1001,
            grnd_level: 985,
            humidity: 77,
            temp_kf: 0,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04n" },
          ],
          clouds: { all: 91 },
          wind: { speed: 7.05, deg: 348, gust: 15.77 },
          visibility: 10000,
          pop: 0,
          sys: { pod: "n" },
          dt_txt: "2022-01-21 06:00:00",
        },
        {
          dt: 1642755600,
          main: {
            temp: 269.65,
            feels_like: 262.74,
            temp_min: 269.65,
            temp_max: 269.65,
            pressure: 1003,
            sea_level: 1003,
            grnd_level: 987,
            humidity: 86,
            temp_kf: 0,
          },
          weather: [
            { id: 804, main: "Clouds", description: "pilvinen", icon: "04d" },
          ],
          clouds: { all: 100 },
          wind: { speed: 7, deg: 356, gust: 14.99 },
          visibility: 9642,
          pop: 0,
          sys: { pod: "d" },
          dt_txt: "2022-01-21 09:00:00",
        },
      ],
      city: {
        id: 634964,
        name: "Tampere",
        coord: { lat: 61.6074, lon: 23.8702 },
        country: "FI",
        population: 0,
        timezone: 7200,
        sunrise: 1642662979,
        sunset: 1642686856,
      },
    };
  
    const tail = (arr) => (arr.length > 1 ? arr.slice(1) : arr);
    const forecast = tail(response.list).map((data) => {
      let dt = new Date(data.dt * 1000);
      const _time = `${("0" + dt.getHours()).slice(-2)}:${(
        "0" + dt.getMinutes()
      ).slice(-2)}`;
      return new ForecastData(
        data.weather[0].icon,
        data.main.temp - 273.15, // transform to celsius
        data.wind.speed,
        data.main.humidity,
        _time,
        typeof response.precipitation === "undefined" ? "--" : data.precipitation //empty if info not available
      );
    });
    return forecast;
  }
  
  export { fetchCurrentWeather, fetchForecast };
  
// Import Open Weather Map api key from api-config.json
import { MaskedViewComponent } from "react-native";
import * as data from "./api-config.json"
const API_KEY = data.key

// React Native doesn't seem to play nice with ECMA-402 Date's (i.e. 
// toLocaleDateString produces non-working results) so the date-fns library is
// required here.  
import { format } from 'date-fns';
import { fi } from 'date-fns/locale'

// This function should, given the name of a city as a string perform a OWM 
// request for this city and return an forecastData object that contains the weather data for
// the current time as well as 5 data for the following hours with 3 hour
// intervals (such that a request made at 11.53 should then contain data for 
// 15.00, 18.00, 21.00, 00.00 and 03.00).


const idLookup = {
    Helsinki: 658225,
    Jyväskylä: 655195,
    Kuopio: 650225,
    Tampere: 634964,
}

// Simple container class for holding the current weather information.
class currentData {
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
        // https://openweathermap.org/weather-conditions
        //http://openweathermap.org/img/wn/10d@2x.png
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

class forecastData {
    constructor(
        icon,
        temperature,
        wind_speed,
        humidity,
        time,
        precipitation = "" //empty if info not available
    ) {
        // https://openweathermap.org/weather-conditions
        //http://openweathermap.org/img/wn/10d@2x.png
        this.icon = icon;
        this.temperature = temperature;
        this.wind_speed = wind_speed;
        this.humidity = humidity;
        this.time = time;
        this.precipitation = precipitation;
    }
}

// Given the name of a city as a string perform a OWM request for this city and 
// return an currentData object that contains the weather data for the current 
// time.
async function fetchCurrentWeather(city) {
    const id = idLookup[city];
    console.log(`API_KEY: ${API_KEY}`);

    const requestString =
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&lang=fi&appid=${API_KEY}`;
    console.log(requestString)
    const request = new Request(requestString);

    // async function fetchData() {
    //     const res = await fetch(request);
    //     //    .then( res => res.json())dddd
    //     //if(!response.ok) {
    //     //    console.error(response.status)
    //     //}
    //     //.then(res => await res.json())
    //     //})
    //     //.then((json) => {
    //     //    console.log(json);
    //     //.catch(error => console.error(error));
    //     console.log(res.json())
    //     return(res.json());
    // }
    try {
        const _response = await fetch(request);
        const response = await _response.json();
        const dt = new Date(response.dt * 1000);
        //console.log("Dt: " + dt)
        const _time = `${dt.getHours()}:${dt.getMinutes()}`;
        // Change unix date to XX. Month -string form (in Finnish)
        //const _date = dt.toLocaleDateString("fi-FI",
        //                                    options={day: "numeric", month: "long"});

        const _date = format(dt, "do MMMM", { locale: fi });
        return new currentData(
            city = city,
            icon = response.weather[0].icon,
            temperature = response.main.temp - 273.15, // transform to celsius
            description = response.weather[0].description,
            wind_speed = response.wind.speed,
            date = _date,
            humidity = response.main.humidity,
            time = _time,
            precipitation =
            typeof (response.precipitation) === "undefined" ? "--" : response.precipitation //empty if info not available
        )
    } catch (error) {
        console.error(error);
    }
    //    .then( res => res.json());
    //const await
    //const response = await fetchData();
    // const response = {
    //     "base": "stations",
    //     "clouds": {
    //         "all": 75,
    //     },
    //     "cod": 200,
    //     "coord": {
    //         "lat": 60.1695,
    //         "lon": 24.9355,
    //     },
    //     "dt": 1642527035,
    //     "id": 658225,
    //     "main": {
    //         "feels_like": 272.73,
    //         "humidity": 84,
    //         "pressure": 1014,
    //         "temp": 272.73,
    //         "temp_max": 273.8,
    //         "temp_min": 271.47,
    //     },
    //     "name": "Helsinki",
    //     "sys": {
    //         "country": "FI",
    //         "id": 2028456,
    //         "sunrise": 1642489475,
    //         "sunset": 1642514172,
    //         "type": 2,
    //     },
    //     "timezone": 7200,
    //     "visibility": 10000,
    //     "weather": [
    //         {
    //             "description": "broken clouds",
    //             "icon": "04n",
    //             "id": 803,
    //             "main": "Clouds",
    //         },
    //     ],
    //     "wind": {
    //         "deg": 259,
    //         "gust": 4.47,
    //         "speed": 0.89,
    //     },
    // }

    // Change Unix time to default HH:MM string.
    // const dt = new Date(response.dt * 1000);
    // console.log("Dt: " + dt)
    // const _time = `${dt.getHours()}:${dt.getMinutes()}`;
    // // Change unix date to XX. Month -string form (in Finnish)
    // //const _date = dt.toLocaleDateString("fi-FI",
    // //                                    options={day: "numeric", month: "long"});

    // const _date = format(dt, "do MMMM", { locale: fi });
    // return new currentData(
    //     city = city,
    //     icon = response.weather[0].icon,
    //     temperature = response.main.temp - 273.15, // transform to celsius
    //     description = response.weather[0].description,
    //     wind_speed = response.wind.speed,
    //     date = _date,
    //     humidity = response.main.humidity,
    //     time = _time,
    //     precipitation =
    //     typeof (response.precipitation) === "undefined" ? "--" : response.precipitation //empty if info not available
    // )
}

// Given the name of a city as a string perform a OWM request and return an 
//forecastData object that contains 5 data for the following hours wrt current
//time with 3 hour intervals (such that a request made at 11.53 should then 
//contain data for 15.00, 18.00, 21.00, 00.00 and 03.00).
async function fetchForecast(city) {
    const id = idLookup[city];
    const requestString =
        `api.openweathermap.org/data/2.5/forecast?id=${id}&cnt=6&lang=fi&appid=${API_KEY}`;
    const request = new Request(requestString);

    try {
        const _response = await fetch(request);
        const response = await _response.json();
        const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
        const forecast =
            tail(response.list).map((data) => {
                let dt = new Date(data.dt * 1000);
                let _time = `${dt.getHours()}:${dt.getMinutes()}`;
                return (new forecastData(
                    icon = data.weather[0].icon,
                    temperature = data.main.temp - 273.15, // transform to celsius
                    wind_speed = data.wind.speed,
                    humidity = data.main.humidity,
                    time = _time,
                    precipitation =
                    typeof (response.precipitation) === "undefined" ? "--" : data.precipitation //empty if info not available
                ))
            })
        return (forecast);
    } catch (error) {
        console.log(error);
    }

}

// const response = {    "cod": "200", "message": 0, "cnt": 6, "list": [{ "dt": 1642615200, "main": { "temp": 275.72, "feels_like": 269.92, "temp_min": 275.58, "temp_max": 275.72, "pressure": 992, "sea_level": 992, "grnd_level": 990, "humidity": 92, "temp_kf": 0.14 }, "weather": [{ "id": 500, "main": "Rain", "description": "pieni sade", "icon": "10n" }], "clouds": { "all": 80 }, "wind": { "speed": 8.71, "deg": 235, "gust": 16.32 }, "visibility": 10000, "pop": 0.2, "rain": { "3h": 0.19 }, "sys": { "pod": "n" }, "dt_txt": "2022-01-19 18:00:00" }, { "dt": 1642626000, "main": { "temp": 275.18, "feels_like": 269.26, "temp_min": 274.88, "temp_max": 275.18, "pressure": 990, "sea_level": 990, "grnd_level": 986, "humidity": 96, "temp_kf": 0.3 }, "weather": [{ "id": 500, "main": "Rain", "description": "pieni sade", "icon": "10n" }], "clouds": { "all": 92 }, "wind": { "speed": 8.57, "deg": 218, "gust": 15.8 }, "visibility": 53, "pop": 0.74, "rain": { "3h": 0.4 }, "sys": { "pod": "n" }, "dt_txt": "2022-01-19 21:00:00" }, { "dt": 1642636800, "main": { "temp": 274.58, "feels_like": 268.62, "temp_min": 274.58, "temp_max": 274.58, "pressure": 985, "sea_level": 985, "grnd_level": 983, "humidity": 98, "temp_kf": 0 }, "weather": [{ "id": 500, "main": "Rain", "description": "pieni sade", "icon": "10n" }], "clouds": { "all": 100 }, "wind": { "speed": 8.16, "deg": 209, "gust": 15.61 }, "visibility": 48, "pop": 0.92, "rain": { "3h": 2.87 }, "sys": { "pod": "n" }, "dt_txt": "2022-01-20 00:00:00" }, { "dt": 1642647600, "main": { "temp": 274.29, "feels_like": 267.84, "temp_min": 274.29, "temp_max": 274.29, "pressure": 981, "sea_level": 981, "grnd_level": 979, "humidity": 97, "temp_kf": 0 }, "weather": [{ "id": 601, "main": "Snow", "description": "lumi", "icon": "13n" }], "clouds": { "all": 100 }, "wind": { "speed": 9.34, "deg": 196, "gust": 16.53 }, "visibility": 44, "pop": 0.97, "snow": { "3h": 3.03 }, "sys": { "pod": "n" }, "dt_txt": "2022-01-20 03:00:00" }, { "dt": 1642658400, "main": { "temp": 274.09, "feels_like": 268.24, "temp_min": 274.09, "temp_max": 274.09, "pressure": 979, "sea_level": 979, "grnd_level": 977, "humidity": 98, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "pieni lumisade", "icon": "13n" }], "clouds": { "all": 100 }, "wind": { "speed": 7.49, "deg": 187, "gust": 13.82 }, "visibility": 58, "pop": 0.97, "snow": { "3h": 1.16 }, "sys": { "pod": "n" }, "dt_txt": "2022-01-20 06:00:00" }, { "dt": 1642669200, "main": { "temp": 274.47, "feels_like": 269.46, "temp_min": 274.47, "temp_max": 274.47, "pressure": 980, "sea_level": 980, "grnd_level": 977, "humidity": 86, "temp_kf": 0 }, "weather": [{ "id": 600, "main": "Snow", "description": "pieni lumisade", "icon": "13d" }], "clouds": { "all": 100 }, "wind": { "speed": 5.82, "deg": 180, "gust": 9.28 }, "visibility": 10000, "pop": 0.72, "snow": { "3h": 1.49 }, "sys": { "pod": "d" }, "dt_txt": "2022-01-20 09:00:00" }], "city": { "id": 658225, "name": "Helsinki", "coord": { "lat": 60.1695, "lon": 24.9355 }, "country": "FI", "population": 0, "timezone": 7200, "sunrise": 1642575770, "sunset": 1642600716 }
//}
//console.log(fetchCurrentWeather("Helsinki"))
//console.log(fetchForecast("Helsinki"))
export { fetchCurrentWeather, fetchForecast, currentData };
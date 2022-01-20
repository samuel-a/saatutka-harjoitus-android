// Import Open Weather Map api key from api-config.json
import { MaskedViewComponent } from "react-native";
import * as keys from "./api-config.json"
const API_KEY = keys.key

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
    /*const request = new Request("https://catfact.ninja/fact");
    const _response = await fetch(request);
    const response = await _response.json();
    return (response);*/
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
    console.log(requestString);
    try {
        const _response = await fetch(request);
        const response = await _response.json();
        const tail = arr => (arr.length > 1 ? arr.slice(1) : arr);
        const forecast =
            tail(response.list).map((data) => {
                let dt = new Date(data.dt * 1000);
                let _time = `${dt.getHours()}:${dt.getMinutes()}`;
                return new forecastData(
                    icon = data.weather[0].icon,
                    temperature = data.main.temp - 273.15, // transform to celsius
                    wind_speed = data.wind.speed,
                    humidity = data.main.humidity,
                    time = _time,
                    precipitation =
                    typeof (response.precipitation) === "undefined" ? "--" : data.precipitation //empty if info not available
                )
            })
        return (forecast);
    } catch (error) {
        console.log(error);
    }
    
    /*const request = new Request("https://catfact.ninja/fact");
    const _response = await fetch(request);
    const response = await _response.json();
    return (response);*/
}

export { fetchCurrentWeather, fetchForecast, currentData };
// Import Open Weather Map api key from api-config.json
import * as data from "./api-config.json"
const API_KEY = data.key

// This function should, given the name of a city as a string perform a OWM 
// request for this city and return an WeatherData object that contains the weather data for
// the current time as well as 5 extra data for the following hours with 3 hour
// intervals (such that a request made at 11.53 should then contain data for 
// 15.00, 18.00, 21.00, 00.00 and 03.00).
function fetchCityData(city) {
    const id = idLookup[city];
    console.log(`API_KEY: ${API_KEY}`);

    const requestString =
        `http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${API_KEY}`;
    console.log(requestString)
    const request = new Request(requestString);
    //const response = fetch(request)
    //    .then((response) => {
    //        console.log(response)
    //        got = response.json();
    //    })
    //    .then((json) => {
    //        console.log(json);
    //    }).catch((error) => {
    //        console.error(error);
        //    })reac;
    const response = {
        "base": "stations",
        "clouds": {
            "all": 75,
        },
        "cod": 200,
        "coord": {
            "lat": 60.1695,
            "lon": 24.9355,
        },
        "dt": 1642527035,
        "id": 658225,
        "main": {
            "feels_like": 272.73,
            "humidity": 84,
            "pressure": 1014,
            "temp": 272.73,
            "temp_max": 273.8,
            "temp_min": 271.47,
        },
        "name": "Helsinki",
        "sys": {
            "country": "FI",
            "id": 2028456,
            "sunrise": 1642489475,
            "sunset": 1642514172,
            "type": 2,
        },
        "timezone": 7200,
        "visibility": 10000,
        "weather": [
            {
                "description": "broken clouds",
                "icon": "04n",
                "id": 803,
                "main": "Clouds",
            },
        ],
        "wind": {
            "deg": 259,
            "gust": 4.47,
            "speed": 0.89,
        },
    }

    // Change Unix time to default HH:MM string.
    const t = new Date(response.dt * 1000);
    const time = `${t.getHours()}:${t.getMinutes()}`;
    const d = t.getDate();
    const date = d.toLocaleDateString("en-US", options={day: "numeric", month: "long"});
    return new WeatherData(
        city = city,
        icon = response.weather[0].icon,
        temperature = response.main, // transform to celsius
        description = weather[0].description,
        wind_speed = wind.speed,
        date = date,
        humidity = response.main.humidity,
        time = time,
        precipitation = 
            typeof(response.precipitation) === "undefined" ? "--" : response.precipitation //empty if info not available
    )
}

idLookup = {
    Helsinki: 658225,
    Jyväskylä: 655195,
    Kuopio: 650225,
    Tampere: 634964,
}

// Simple container class for holding the weather information that's of interest
// to us.
class WeatherData {
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
export { fetchCityData, WeatherData };

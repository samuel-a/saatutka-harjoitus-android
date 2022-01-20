# Säätutka-harjoitus, android

Part of a recruitment process. A React Native app that uses OpenWeather's
Weather API to show weather information for select locations in Finland.

## How to run

`npm start` and a platform that can run android Expo apps, such as an adroid
simulator or Expo Go (https://expo.dev/client). Api configuration is done by
placing your OWM api key in `api-config.json`.

## Notes
* Created with create-react-native-app.
* OWM api will block you for some amount of time if you run too many requests
too fast so be mindful of this. Requests are only generated when you change your
selection in the dropdown.

## Screenshots
![A view showing all cities](./screenshots/AllCities.jpg)
![A view showing all cities](./screenshots/Tampere.jpg)
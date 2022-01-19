import { View, Text, StyleSheet, Image, ImageEditor }
  from "react-native";
import React, { useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown"
import { fetchCurrentWeather, fetchForecast } from "./request.js";
import { useFonts } from 'expo-font'; // Required for Arial


// Context used solely for transferring knowledge of which cities are selected
// from dropdown to WeatherList
const selectionContext = React.createContext(
  {
    selection: "Kaikki kaupungit",
    setSelection: () => { }
  });

const cities = [
  "Kaikki kaupungit",
  "Helsinki",
  "Jyväskylä",
  "Kuopio",
  "Tampere"
]

export default function App() {
  const [selection, setSelection] = useState(cities[0])
  const value = { selection, setSelection };
  return (
    <selectionContext.Provider value={value}>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#F8F9FA"
        }}
      >
        <TopBar />
        <DropDown />
        <CurrentWeatherView/>
        <ForecastWeatherViewContainer/>
      </View >
    </selectionContext.Provider>
  );
}

function TopBar() {
  return (
    <View style={styles.topBar}>
      <CustomText style={styles.topBarText}>
        Säätutka
      </CustomText>
    </View>
  );
}

function DropDown() {
  const { selection, setSelection } = useContext(selectionContext);
  return (
    <SelectDropdown
      defaultButtonText={cities[0]}
      buttonStyle={styles.dropdownButton}
      buttonTextStyle={styles.dropdownText}
      data={cities}
      onSelect={(selectedItem, index) => {
        setSelection(selectedItem)
        console.log(selection)
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        // if data array is an array of objects then return item.property to represent item in dropdown
        return item
      }}
    />
  );
}

function CurrentWeatherView(props) {
  const { selection, setSelection } = useContext(selectionContext);
  const data = fetchCurrentWeather("Helsinki")//selection
  console.log(`https://openweathermap.org/img/wn/${data.icon}@2x.png`);
  return (
      <View style={styles.currentWeatherView}>
        <View style={styles.row}>
          <View>
            <CustomText style={styles.cityText}>{data.city}</CustomText>
            <CustomText style={styles.descriptionText}>{data.description}</CustomText>
          </View>
          <View style={styles.row}>
            <View>
              <Image source={{ uri: `https://openweathermap.org/img/wn/${data.icon}@2x.png` }}
                style={{ width: 60, height: 60, marginTop: -12, marginRight: 5 }} />
            </View>
            <View>
              <CustomText style={styles.temperatureText}>
                {data.temperature.toFixed(1) + "°C"}
              </CustomText>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <CustomText />
            <CustomText style={styles.dateText}>{data.date}</CustomText>
            <CustomText style={styles.timeText}>{data.time}</CustomText>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <CustomText style={styles.specificsText}>
              {"Tuuli: " + data.wind_speed + " m/s"}
            </CustomText>
            <CustomText style={styles.specificsText}>
              {"Ilmankosteus: " + data.humidity + "%"}
            </CustomText>
            <CustomText style={styles.specificsText}>
              {"Sademäärä (3h): " + data.precipitation + "mm"}
            </CustomText>
          </View>
        </View>
      </View>
  );
}

function ForecastWeatherViewContainer(props) {
  const { selection, setSelection } = useContext(selectionContext);
  const data = fetchForecast("Helsinki")//selection
  return (
    <View style={styles.row}>
      <ForecastWeatherView data={data[0]} />
      <ForecastWeatherView data={data[1]} />
      <ForecastWeatherView data={data[2]} />
      <ForecastWeatherView data={data[3]} />
      <ForecastWeatherView data={data[4]} />
    </View>
  );
}

function ForecastWeatherView(props) {
  return (
    <View styles={styles.forecastWeatherViewContainer}>
      <View style={styles.forecastWeatherViewTop}>
        <CustomText style={styles.timeText}>
          {props.data.time}
        </CustomText>
        <Image source={{ uri: `https://openweathermap.org/img/wn/${props.data.icon}@2x.png` }}
          style={{ width: 40, height: 40}} />
        <CustomText style={styles.smallTemperatureText}>
          {props.data.temperature.toFixed(1) + "°C"}
        </CustomText>
      </View>
      <View style={styles.forecastWeatherViewBottom}>
        <CustomText style={styles.smallSpecificsText}>
          {props.data.wind_speed + "m/s"}
        </CustomText>
        <CustomText style={styles.smallSpecificsText}>
          {props.data.humidity + "%"}
        </CustomText>
        <CustomText style={styles.smallSpecificsText}>
          {props.data.precipitation + "mm"}</CustomText>
      </View>
    </View >
  )
}

// Required for global style inheritance, in this case the font.
function CustomText(props) {
  const [loaded] = useFonts({
    Arial: require("./assets/fonts/arial.ttf")
  });

  if (!loaded) {
    return null;
  }

  return (
    <Text style={Object.assign({}, props.style, { fontFamily: "Arial" })}>
      {props.children}
    </Text>
  );
}

styles = StyleSheet.create({
  topBar: {
    alignSelf: "stretch",
    height: 90,
    backgroundColor: "#00A5E5",
    alignItems: "center",
    justifyContent: "center"
  },

  topBarText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginTop: 32
  },

  dropdownText: {
    fontSize: 13,
    color: "#262626"
  },

  dropdownButton: {
    minWidth: "85%",
    maxWidth: 400,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E6E6E6",
  },

  currentWeatherView: {
    minWidth: "85%",
    maxWidth: 400,
    minHeight: 150,
    maxHeight: 400,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginTop: 10,
  },

  forecastWeatherViewTop: {
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: "#E6E6E6",
    paddingHorizontal: 7,
    paddingVertical: 5,
    maxWidth: 60,
    marginHorizontal: 3,
    marginTop: 6,
  },

  forecastWeatherViewBottom: {
    maxHeight: "34%",
    //flex: 1,400
    flexDirection: "column",
    backgroundColor: "#E5F6FD",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#E6E6E6",
    paddingHorizontal: 10,
    paddingVertical: 5,
    maxWidth: 60,
    minHeight: 50,
    marginHorizontal: 3,
  },

  forecastWeatherViewContainer: {
    maxHeight: 170,
    maxWidth: 400,
    minWidth: "85%",
  },

  box: {
    width: 50,
    height: 20,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  headline: {
    fontSize: 18,
    color: "#FFFFFF"
  },

  cityText: {
    fontSize: 19,
    color: "#262626",
  },

  dateText: {
    fontSize: 15,
    color: "#262626"
  },

  timeText: {
    fontSize: 13,
    color: "#70757A"
  },

  descriptionText: {
    fontSize: 13,
    color: "#70757A"
  },

  temperatureText: {
    fontSize: 26,
    color: "#262626",
  },

  smallTemperatureText: {
    fontSize: 15,
    color: "#70757A",
  },

  specificsText: {
    fontSize: 13,
    color: "#70757A",
  },

  smallSpecificsText: {
    fontSize: 10,
    color: "#70757A",
  },
});
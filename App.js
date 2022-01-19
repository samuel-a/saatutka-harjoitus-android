import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView }
  from "react-native";
import React, { useState, useContext, useEffect } from "react";
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
    <SafeAreaView
      style={{ backgroundColor: "#F8F9FA", flex: 1 }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 15
          }}>
          <TopBar />
          <selectionContext.Provider value={value}>
            <DropDown />
            <ViewPicker style={{ minWidth: "85%", maxWidth: 400 }} />
            {/*<CurrentWeatherView />
          <ForecastWeatherViewContainer />*/}
          </selectionContext.Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ViewPicker() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])
  const [singleData, setSingleData] = useState([])
  const { selection, setSelection } = useContext(selectionContext);
  console.log("selection at ViewPicker(): " + selection)

  const getData = async () => {
    if (selection === "Kaikki kaupungit") {
      // const hel = await fetchCurrentWeather("Helsinki");
      // const helForecast = await fetchForecast("Helsinki");
      // const kuo = await fetchCurrentWeather("Kuopio");
      // const kuoForecast = await fetchForecast("Kuopio");
      // const jyv = fetchCurrentWeather("Jyväskylä");
      // const jyvForecast = await fetchForecast("Jyväskylä");
      // const tam = fetchCurrentWeather("Tampere");
      // const tamForecast = await fetchForecast("Tampere");

      const [
        hel, helForecast,
        kuo, kuoForecast,
        jyv, jyvForecast,
        tam, tamForecast] = await Promise.all([
          fetchCurrentWeather("Helsinki"),
          fetchForecast("Helsinki"),
          fetchCurrentWeather("Kuopio"),
          fetchForecast("Kuopio"),
          fetchCurrentWeather("Jyväskylä"),
          fetchForecast("Jyväskylä"),
          fetchCurrentWeather("Tampere"),
          fetchForecast("Tampere")]
          );

      setData([
        hel, helForecast,
        kuo, kuoForecast,
        jyv, jyvForecast,
      tam, tamForecast]);
      setLoading(false);
    } else {
      console.log("we hit else clause")
      const single_data = await Promise.all([
        fetchCurrentWeather(selection),
        fetchForecast(selection)]);
        ///[selectionData, selectionForecastData]
      setSingleData(single_data);
      setLoading(false);
    }
  }
  
  useEffect(() => {
    getData();
  }, [])

  if (selection === "Kaikki kaupungit") {
    return (
        loading ? <Text>Loading...</Text> : (
        <View>
        <CurrentWeatherView data={data[0]} />
        <ForecastWeatherViewContainer data={data[1]} />
        <CurrentWeatherView data={data[2]} />
        <ForecastWeatherViewContainer data={data[3]} />
        <CurrentWeatherView data={data[4]} />
        <ForecastWeatherViewContainer data={data[5]} />
        <CurrentWeatherView data={data[6]} />
        <ForecastWeatherViewContainer data={data[7]} />
      </View>)
    )
  } else {
    return (
      loading ? <Text> Loading... </Text> :
      <View>
        <CurrentWeatherView data={singleData[0]} />
        <ForecastWeatherViewContainer data={singleData[1]} />
      </View>
    )
  }
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
        console.log("selection at DropDown(): "+ selection)
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
  console.log("In CurrentWeatherView, props.data:");
  console.log(props.data);
  return (
    <View style={styles.currentWeatherView}>
      <View style={styles.row}>
        <View>
          <CustomText style={styles.cityText}>{props.data.city}</CustomText>
          <CustomText style={styles.descriptionText}>{props.data.description}</CustomText>
        </View>
        <View style={styles.row}>
          <View>
            <Image source={{ uri: `https://openweathermap.org/img/wn/${props.data.icon}@2x.png` }}
              style={{ width: 60, height: 60, marginTop: -12, marginRight: 5 }} />
          </View>
          <View>
            <CustomText style={styles.temperatureText}>
              {props.data.temperature.toFixed(1) + "°C"}
            </CustomText>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <CustomText />
          <CustomText style={styles.dateText}>{props.data.date}</CustomText>
          <CustomText style={styles.timeText}>{props.data.time}</CustomText>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <CustomText style={styles.specificsText}>
            {"Tuuli: " + props.data.wind_speed + " m/s"}
          </CustomText>
          <CustomText style={styles.specificsText}>
            {"Ilmankosteus: " + props.data.humidity + "%"}
          </CustomText>
          <CustomText style={styles.specificsText}>
            {"Sademäärä (3h): " + props.data.precipitation + "mm"}
          </CustomText>
        </View>
      </View>
    </View>
  );
}

function ForecastWeatherViewContainer(props) {
  return (
    <View style={[styles.row, { minWidth: "85%", maxWidth: 400, marginTop: 7, marginBottom: 5 }]}>
      <ForecastWeatherView data={props.data[0]} />
      <ForecastWeatherView data={props.data[1]} />
      <ForecastWeatherView data={props.data[2]} />
      <ForecastWeatherView data={props.data[3]} />
      <ForecastWeatherView data={props.data[4]} />
    </View>
  );
}

function ForecastWeatherView(props) {
  return (
    <View style={styles.forecastWeatherViewContainer}>
      <View style={styles.forecastWeatherViewTop}>
        <CustomText style={styles.timeText}>
          {props.data.time}
        </CustomText>
        <Image source={{ uri: `https://openweathermap.org/img/wn/${props.data.icon}@2x.png` }}
          style={{ width: 40, height: 40 }} />
        <CustomText style={styles.smallTemperatureText}>
          {props.data.temperature.toFixed(1) + "°C"}
        </CustomText>
      </View>
      <View style={styles.forecastWeatherViewBottom}>
        <CustomText style={styles.smallSpecificsText}>
          {props.data.wind_speed + " m/s"}
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
    justifyContent: "center",
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
    marginTop: 20
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
    marginTop: 20
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    maxWidth: "100%",
    marginHorizontal: 1
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
    paddingHorizontal: 5,
    paddingVertical: 5,
    maxWidth: 60,
    minHeight: 50,
    marginHorizontal: 1,
  },

  forecastWeatherViewContainer: {
    maxHeight: 170,
    width: "18%",
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
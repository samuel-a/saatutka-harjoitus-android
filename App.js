import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import SelectDropdown from "react-native-select-dropdown";
import { fetchCurrentWeather, fetchForecast } from "./fetch.js";
import { styles } from "./styles.js";
import { useFonts } from "expo-font"; // Required for Arial

// Context used solely for transferring knowledge of which cities are selected
// from dropdown to WeatherList
const selectionContext = React.createContext({
  selection: "Kaikki kaupungit",
  setSelection: () => { },
});

// Cities to be picked from, first option is all cities because this structure
// is fed directly into the dropdown menu. Could be done otherwise.
const cities = [
  "Kaikki kaupungit",
  "Helsinki",
  "Jyväskylä",
  "Kuopio",
  "Tampere",
];

// Shows weather information for the city selected in the dropdown or for all
// cities, though it could be changed to portray any combination of cities.
export default function App() {
  const [selection, setSelection] = useState(cities[0]);
  const value = { selection, setSelection };

  return (
    <SafeAreaView style={{ backgroundColor: "#F8F9FA", flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            marginBottom: 15,
          }}>
          <TopBar />
          <selectionContext.Provider value={value}>
            <DropDown/>
            <ViewPicker style={{ minWidth: "85%", maxWidth: 400 }} />
          </selectionContext.Provider>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Chooses weather to fshow all cities or just the one selected by name in the
// dropdown.
const ViewPicker = () => {
  const { selection, setSelection } = useContext(selectionContext);

  if (selection === cities[0]) {
    return (
      <View>
        {cities.slice(1).map((city) => {
          return (
            <View key={city}>
              <CurrentWeatherView city={city} />
              <ForecastWeatherViewContainer city={city} />
            </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <View>
        <CurrentWeatherView city={selection} />
        <ForecastWeatherViewContainer city={selection} />
      </View>
    );
  }
};

// Bar at the top of the app. Has title.
const TopBar = () => {
  return (
    <View style={styles.topBar}>
      <CustomText style={styles.topBarText}>Säätutka</CustomText>
    </View>
  );
}

// Dropdown menu that facilitates the picking of cities
const DropDown = () => {
  const { selection, setSelection } = useContext(selectionContext);
  return (
    <SelectDropdown
      defaultButtonText={cities[0]}
      buttonStyle={styles.dropdownButton}
      buttonTextStyle={styles.dropdownText}
      data={cities}
      onSelect={(selectedItem, index) => {
        // upon selection change the selection value in the context
        setSelection(selectedItem);
      }}
      buttonTextAfterSelection={(selectedItem, index) => {
        // text represented after item is selected
        return selectedItem;
      }}
      rowTextForSelection={(item, index) => {
        // text represented for each item in dropdown
        return item;
      }}
    />
  );
}

// Displays weather information for the current weather for the current city in
// the selection context.
const CurrentWeatherView = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { selection, setSelection } = useContext(selectionContext);

  

  useEffect(() => {
    const getData = async () => {
      const _data = await fetchCurrentWeather(props.city);
      setData(_data);
      setLoading(false);
    };
    getData();
  }, [selection, props.city]); //Fetch on re-renders i.e. when the selection changes.

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View style={styles.currentWeatherView}>
      <View style={styles.row}>
        <View>
          {/*<CustomText>{props.city + data.fact}</CustomText>*/}
          <CustomText style={styles.cityText}>{data.city}</CustomText>
          <CustomText style={styles.descriptionText}>
            {data.description}
          </CustomText>
        </View>
        <View style={styles.row}>
          <View>
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${data.icon}@2x.png`,
              }}
              style={{ width: 60, height: 60, marginTop: -12, marginRight: 5 }}
            />
          </View>
          <View>
            <CustomText style={styles.temperatureText}>
              {data.temperature.toFixed(0) + "°C"}
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

// Holds several ForecastWeatherViews and delivers them their data through props.
const ForecastWeatherViewContainer = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const { selection, setSelection } = useContext(selectionContext);

  

  useEffect(() => {
    const getData = async () => {
      const _data = await fetchForecast(props.city);
      setData(_data);
      setLoading(false);
    };
    getData();

  }, [selection, props.city]); //Fetch on re-renders i.e. when the selection changes.

  return loading ? (
    <Text>Loading...</Text>
  ) : (
    <View
      style={[
        styles.row,
        { minWidth: "85%", maxWidth: 400, marginTop: 7, marginBottom: 5 },
      ]}
    >
      {data.map( _data =>
        <ForecastWeatherView key={_data.time} data={_data} />
      )}
    </View>
  );
}

// Draws forecast weather information for a single forecast.
const ForecastWeatherView = (props) => {
  return (
    <View style={styles.forecastWeatherViewContainer}>
      {/*<CustomText>props.data.fact</CustomText>*/}
      <View style={styles.forecastWeatherViewTop}>
        <CustomText style={styles.timeText}>{props.data.time}</CustomText>
        <Image
          source={{
            uri: `https://openweathermap.org/img/wn/${props.data.icon}@2x.png`,
          }}
          style={{ width: 40, height: 40 }}
        />
        <CustomText style={styles.smallTemperatureText}>
          {props.data.temperature.toFixed(0) + "°C"}
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
          {props.data.precipitation + "mm"}
        </CustomText>
      </View>
    </View>
  );
}

// Required for global style inheritance, in this case the font.
const CustomText = (props) => {
  const [loaded] = useFonts({
    Arial: require("./assets/fonts/arial.ttf"),
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

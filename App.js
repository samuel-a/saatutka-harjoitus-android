import { View, Text, StyleSheet }
  from "react-native";
import React, { useState, useContext } from "react";
import SelectDropdown from "react-native-select-dropdown"
import {fetchCityData, idMap} from "./request.js";

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
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#F8F9FA"
      }}
    >
      <TopBar />
      <selectionContext.Provider value={value}>
        <DropDown style={{ flex: 1 }} />
        <selectionContext.Consumer>
          {({ selection, setSelection }) => (
            <Text>{selection}</Text>
          )}
        </selectionContext.Consumer>
      </selectionContext.Provider>
      <Text>Text between dropdown and WeatherView list</Text>
      <WeatherView />
    </View>
  );
}

function TopBar() {
  return (
    <View style={styles.topBar}>
      <Text style={styles.topBarText}>
        Säätutka
      </Text>
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
function WeatherView(props) {
  return (
    <View>
      <Text> Text at the top of a WeatherView component</Text>
      <View style={styles.weatherViewContainer}>
        <View style={styles.row}>
          <View>
            <Text style={styles.cityText}>Kaupunki</Text>
            <Text style={styles.descriptionText}>Yleiskuvaus</Text>
          </View>
          <View style={styles.row}>
            <View>
              <Text>Icon</Text>
            </View>
            <View>
              <Text style={styles.temperatureText}>
                Lämpötila
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text />
            <Text style={styles.dateText}>Pvm</Text>
            <Text style={styles.timeText}>Klo</Text>
          </View>
          <View>
            <Text style={styles.specificsText}>Tuulenopeus</Text>
            <Text style={styles.specificsText}>Ilmankosteus</Text>
            <Text style={styles.specificsText}>Sademäärä</Text>
          </View>
        </View>
      </View>
      {// draw 5 small views

      }
    </View>
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

  weatherViewContainer: {
    maxHeight: 200,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 12,
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
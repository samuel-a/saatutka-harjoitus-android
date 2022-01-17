import { View, Text, StyleSheet}
  from "react-native";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Universal React with Expo</Text>
      <WeatherView/>
    </View>
  );
}

const WeatherView = () => {
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
            <Text/>
            <Text style={styles.dateText}>Pvm</Text>
            <Text style={styles.timeText}>Klo</Text>
            </View>
            <View>
              <Text style={styles.specificsText}>Tuulenopeus</Text>
              <Text style={styles.specificsText}>Ilmankosteus</Text>
              <Text style={styles.specificsText}>Sademäärä</Text>
            </View>
        </View>
    </View></View>
  );
}

styles = StyleSheet.create({
  weatherViewContainer: {
    maxHeight: 200,
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E6E6E6",
    paddingHorizontal: 15,
    paddingVertical: 12
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
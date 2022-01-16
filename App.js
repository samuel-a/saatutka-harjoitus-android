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
      <View style={styles.container}>
        <View style={styles.row}>
        <View
          style={[styles.box, {backgroundColor: "orange"}]}/>
        <View
          style={[styles.box, {backgroundColor: "blue"}]}/>
        <View
          style={[styles.box, {backgroundColor: "blue"}]}/>
        <View
          style={[styles.box, {backgroundColor: "blue"}]}/>
  </View>
    </View></View>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "aliceblue",
    maxHeight: 200,
  },
  box: {
    width: 50,
    height: 80,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
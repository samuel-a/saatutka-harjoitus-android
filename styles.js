export default styles = StyleSheet.create({
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
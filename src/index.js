import React from "react";
import { StyleSheet, View } from "react-native";
import Routes from "./routes";

const Main = () => {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8DA1",
  },
});

export default Main;

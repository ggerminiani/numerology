import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Sheets from "../../styles/Sheets";

const ButtonNavigation = ({ title, Screen, navigation }) => {
  const onPress = () => {
    if (Screen === "back") {
      navigation.goBack();
    } else {
      navigation.navigate(Screen);
    }
  };
  return (
    <View>
      <TouchableOpacity
        style={Sheets.buttonContainer}
        onPress={() => onPress(Screen)}
      >
        <Text style={Sheets.buttonText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonNavigation;

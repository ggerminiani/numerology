import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Sheets from "../../styles/Sheets";
const ButtonNavigation = ({
  icon = "",
  title,
  Screen,
  navigation = null,
  onPressReturn,
}) => {
  const onPress = () => {
    if (navigation !== null) {
      if (Screen === "back") {
        navigation.goBack();
      } else {
        navigation.navigate(Screen);
      }
    } else {
      onPressReturn(true);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => onPress(Screen)}
      style={Sheets.buttonContainer}
    >
      {(icon = "" ? null : <Icon name={icon} style={Sheets.icon} />)}
      <Text style={Sheets.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default ButtonNavigation;

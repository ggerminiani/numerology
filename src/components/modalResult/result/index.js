import React from "react";
import { Text, View } from "react-native";
import Sheets from "../../../styles/Sheets/";

const Result = ({ title = "", subtitle = "", message = "" }) => {
  return (
    <View style={Sheets.background_modal}>
      <View style={{ flex: 1 }}>
        <Text style={Sheets.resultTitle}>{title}</Text>
        <Text style={Sheets.resultSubtitle}>{subtitle}</Text>
        <Text style={Sheets.resultMessage}>{message}</Text>
      </View>
    </View>
  );
};

export default Result;

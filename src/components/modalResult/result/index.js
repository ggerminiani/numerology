import React from "react";
import { Text, View } from "react-native";
import Sheets from "../../../styles/Sheets/";

const Result = ({ title = "", subtitle = "", message = "", color = "" }) => {
  return (
    <View style={Sheets.background_modal}>
      <View
        style={[
          { flex: 1, justifyContent: "center" },
          color !== ""
            ? {
                backgroundColor: color,
                borderRadius: 10,
              }
            : "",
        ]}
      >
        <Text style={Sheets.resultTitle}>{title}</Text>
        <Text style={Sheets.resultSubtitle}>{subtitle}</Text>
        <Text style={Sheets.resultMessage}>{message}</Text>
      </View>
    </View>
  );
};

export default Result;

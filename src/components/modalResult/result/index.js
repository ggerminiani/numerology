import React from "react";
import { Text, View } from "react-native";
import Sheets from "../../../styles/Sheets/";

const Result = ({ title = "", subtitle = "", message = "", color = "" }) => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={[
          { flex: 1, justifyContent: "center" },
          color !== ""
            ? {
                backgroundColor: color,
                borderRadius: 10,
                margin: 10,
                padding: 5,
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

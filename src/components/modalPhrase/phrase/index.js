import React from "react";
import { Text, View } from "react-native";
import Sheets from "../../../styles/Sheets";
import moment from "../../../vendors/moment";
import { cammelCase, capitalLetter } from "../../../vendors/string";

const PhraseItem = ({ phrase, author, date, key_item }) => {
  return (
    <View
      style={[
        Sheets.background_modal,
        { borderRadius: 10, marginVertical: 10 },
      ]}
    >
      <Text style={Sheets.resultTitle}>{`Frase de ${moment(date).format(
        "dddd"
      )}`}</Text>
      <Text style={Sheets.resultSubtitle}>{`${moment(date).format(
        "DD [de] MMMM [de] YYYY"
      )}`}</Text>
      {/* <Text>{key_item}</Text> */}
      <Text style={Sheets.resultMessage}>
        {capitalLetter(phrase.trim().toLowerCase())}
      </Text>
      <Text style={Sheets.resultAuthor}>{cammelCase(author.trim())}</Text>
    </View>
  );
};

export default PhraseItem;

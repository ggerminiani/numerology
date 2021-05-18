import React from "react";
import { View } from "react-native";
import ButtonNavigation from "../../components/buttonNavigation";
import Sheets from "../../styles/Sheets";

const Main = ({ navigation }) => {
  return (
    <View style={Sheets.containerFull}>
      <ButtonNavigation
        title="Numerologia"
        Screen="Numerology"
        navigation={navigation}
      />
      <ButtonNavigation
        title="Nomes para seu bebê"
        Screen="Baby"
        navigation={navigation}
      />
      <ButtonNavigation
        title="Biscoito da Sorte"
        Screen="Phrases"
        navigation={navigation}
      />
    </View>
  );
};

export default Main;

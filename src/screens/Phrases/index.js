import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import Sheets from "../../styles/Sheets";

const Phrases = ({ navigation }) => {
  const [name, setName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultTest, setResultTest] = useState("");

  return (
    <View style={Sheets.containerFull}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={Sheets.container}
      >
        <TextInputPersonal
          value={name}
          onChangeText={(e) => setName(e)}
          placeholder="Nome"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />

        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => onPress()}
        >
          <Text style={Sheets.buttonText}>Frase da Sorte</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <ButtonNavigation Screen="back" title="Voltar" navigation={navigation} />
      <ModalResult
        showModal={showModal}
        setShowModal={(e) => setShowModal(e)}
        data={resultTest}
      />
    </View>
  );
};

export default Phrases;

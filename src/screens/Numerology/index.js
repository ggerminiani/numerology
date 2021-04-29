import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  calculate_astrology_color,
  calculate_numerology,
} from "../../algorithm";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import {
  ASTROLOGY_COLORS,
  LETTERS,
  LETTER_VALUE,
  NUMEROLOGY,
  VALUES_ASTROLOGY,
  VALUES_NUMEROLOGY,
  VOWELS,
} from "../../data";
import Sheets from "../../styles/Sheets";
import moment from "../../vendors/moment";

const Numerology = ({ navigation }) => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultTest, setResultTest] = useState("");

  const onPress = () => {
    const data_validation = [
      {
        value: name,
        required: true,
        type: "list",
        message: "Para prosseguir, informe seu nome completo.",
      },
      {
        value: birthday,
        required: true,
        type: "date",
      },
    ];

    if (name === "") {
      Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
      return;
    }

    if (name.split(" ").length < 2) {
      Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
      return;
    }

    if (birthday === "") {
      Alert.alert(
        "Atenção!",
        "Para prosseguir, informe sua data de nascimento."
      );
      return;
    }

    if (!moment(birthday.split("/").reverse().join("-")).isValid()) {
      Alert.alert(
        "Atenção!",
        "Para prosseguir, informe uma data de nascimento válida."
      );
      return;
    }

    let numerology = [];
    let { result, message } = calculate_numerology(
      name,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    numerology.push({
      title: "Os astros leram seu nome...",
      subtitle: `Seu número é o ${result}!`,
      message,
      color: "",
    });

    let color = calculate_astrology_color(
      birthday,
      VALUES_ASTROLOGY,
      ASTROLOGY_COLORS
    );

    numerology.push({
      title: "Astrologia das Cores...",
      subtitle: `Os astros indicam que pela sua data de nascimento, sua cor predominante é ${color.result.toUpperCase()}!`,
      message: "",
      color: color.message,
    });

    setResultTest(numerology);
    setShowModal(true);
  };

  return (
    <View style={Sheets.containerFull}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={Sheets.container}
      >
        <TextInputPersonal
          value={name}
          onChangeText={(e) => setName(e)}
          placeholder="Nome Completo"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />
        <TextInputPersonal
          value={birthday}
          onChangeText={(e) => setBirthday(e)}
          placeholder="Data de Nascimento"
          keyboardType="number-pad"
          type="datetime"
          options={{
            format: "DD/MM/YYYY",
          }}
        />
        <TouchableOpacity
          style={Sheets.buttonContainer}
          onPress={() => onPress()}
        >
          <Text style={Sheets.buttonText}>Consultar os Astros</Text>
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

export default Numerology;

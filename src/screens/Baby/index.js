import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { loadAdInterstitial } from "../../ads";
import {
  baby_name,
  calculate_numerology,
  extract_number,
} from "../../algorithm";
import ButtonNavigation from "../../components/buttonNavigation";
import ModalResult from "../../components/modalResult";
import TextInputPersonal from "../../components/textInputPersonal";
import {
  LETTERS,
  LETTER_VALUE,
  NAMES,
  NUMEROLOGY,
  VALUES_NUMEROLOGY,
  VOWELS,
} from "../../data";
import Sheets from "../../styles/Sheets";

const Baby = ({ navigation }) => {
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultTest, setResultTest] = useState("");

  useEffect(() => {
    loadAdInterstitial();
  }, []);

  const onPress = () => {
    if (motherName === "") {
      Alert.alert("Atenção!", "Para prosseguir, informe o nome da mãe.");
      return;
    }

    if (fatherName === "") {
      Alert.alert("Atenção!", "Para prosseguir, informe o nome do pai.");
      return;
    }

    if (familyName === "") {
      Alert.alert(
        "Atenção!",
        "Para prosseguir, informe o sobrenome da criança."
      );
      return;
    }

    let numerology = [];
    const mother = calculate_numerology(
      motherName,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    const father = calculate_numerology(
      fatherName,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    const family = calculate_numerology(
      familyName,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    console.log("mother", mother.result);
    console.log("father", father.result);
    console.log("family", family.result);

    let sum = mother.result + father.result + family.result;
    sum = extract_number(sum, VALUES_NUMEROLOGY);
    console.log("sum", sum);

    const result = baby_name(
      sum,
      familyName,
      NAMES,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    setResultTest(result);
    setShowModal(true);
  };

  return (
    <View style={Sheets.containerFull}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={Sheets.container}
      >
        <TextInputPersonal
          value={motherName}
          onChangeText={(e) => setMotherName(e)}
          placeholder="Nome da Mãe"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />
        <TextInputPersonal
          value={fatherName}
          onChangeText={(e) => setFatherName(e)}
          placeholder="Nome do Pai"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />
        <TextInputPersonal
          value={familyName}
          onChangeText={(e) => setFamilyName(e)}
          placeholder="Sobrenome da Criança"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
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
        list={true}
      />
    </View>
  );
};

export default Baby;

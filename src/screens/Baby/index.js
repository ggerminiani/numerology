import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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
import Colors from "../../styles/Colors";
import Sheets from "../../styles/Sheets";

const Baby = ({ navigation }) => {
  const [motherName, setMotherName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [resultTest, setResultTest] = useState("");
  const [loading, setLoading] = useState(true);
  const [first, setFirst] = useState(true);

  useEffect(() => {
    const loadAd = async () => {
      await loadAdInterstitial();
      setLoading(false);
    };

    if (first) {
      loadAd();
      setFirst(false);
    }
  }, [resultTest]);

  const onPress = async () => {
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

    const mother = calculate_numerology(
      motherName.concat(familyName),
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    const father = calculate_numerology(
      fatherName.concat(familyName),
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

    //let sum = mother.result + father.result + family.result;
    let sum = mother.result + father.result;
    sum = extract_number(sum, VALUES_NUMEROLOGY);

    const result = await baby_name(
      sum,
      familyName,
      NAMES,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    await setResultTest(result);
    setShowModal(true);
  };

  return (
    <View style={Sheets.containerFull}>
      {loading ? (
        <View style={Sheets.loading}>
          <ActivityIndicator size={50} color={Colors.button} />
          <Text>Carregando...</Text>
        </View>
      ) : (
        <>
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
              onSubmitEditing={() => {}}
            />
            <TextInputPersonal
              value={fatherName}
              onChangeText={(e) => setFatherName(e)}
              placeholder="Nome do Pai"
              autoCapitalize="characters"
              autoCompleteType="name"
              keyboardType="default"
              onSubmitEditing={() => {}}
            />
            <TextInputPersonal
              value={familyName}
              onChangeText={(e) => setFamilyName(e)}
              placeholder="Sobrenome da Criança"
              autoCapitalize="characters"
              autoCompleteType="name"
              keyboardType="default"
              onSubmitEditing={() => {}}
            />
            <TouchableOpacity
              style={Sheets.buttonContainer}
              onPress={() => onPress()}
            >
              <Text style={Sheets.buttonText}>Consultar os Astros</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>

          <ButtonNavigation
            Screen="back"
            title="Voltar"
            navigation={navigation}
          />
          <ModalResult
            showModal={showModal}
            setShowModal={(e) => setShowModal(e)}
            data={resultTest}
            list={true}
          />
        </>
      )}
    </View>
  );
};

export default Baby;

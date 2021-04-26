import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { calculate_numerology } from "./algorithm/index";
import {
  LETTERS,
  LETTER_VALUE,
  NUMEROLOGY,
  VALUES_NUMEROLOGY,
  VOWELS,
} from "./data";
import { validation } from "./helper/";
import moment from "./vendors/moment";

const Main = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messagem, setMessagem] = useState("");
  const [resultNumber, setResultNumber] = useState("");

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

    if (!validation(data_validation)) {
      return;
    }

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

    const { result, message } = calculate_numerology(
      name,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    setMessagem(message);
    setResultNumber(result);
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.half}
      >
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(e) => setName(e)}
          placeholder="Nome Completo"
          placeholderTextColor="#c8b8c9"
          autoCapitalize="characters"
          autoCompleteType="name"
          keyboardType="default"
        />
        <TextInputMask
          style={styles.input}
          value={birthday}
          onChangeText={(e) => setBirthday(e)}
          placeholder="Data de Nascimento"
          placeholderTextColor="#c8b8c9"
          keyboardType="number-pad"
          type="datetime"
          options={{
            format: "DD/MM/YYYY",
          }}
        />
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => onPress()}
        >
          <Text style={styles.buttonText}>Consultar os Astros</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <View style={{ flex: 1 }}>
            <Text style={styles.resultTitle}>Os astros leram seu nome...</Text>
            <Text style={styles.resultSubtitle}>
              {`Seu número é o ${resultNumber}!`}
            </Text>
            <Text style={styles.resultMessage}>{messagem}</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setShowModal(false)}
          >
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF8DA1",
  },
  half: {
    flex: 2,
    justifyContent: "center",
  },
  half_quarter: {
    marginTop: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 10,
    padding: 15,
    textAlign: "center",
    color: "#FFF",
    backgroundColor: "#b26270",
    fontStyle: "italic",
    fontSize: 16,
    borderRadius: 10,
  },
  buttonContainer: {
    margin: 10,
    padding: 15,
    backgroundColor: "#4c2a30",
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "700",
  },
  modal: {
    flex: 1,
    backgroundColor: "#6019",
    padding: 10,
  },
  resultTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: 22,
    textAlign: "center",
  },
  resultMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "justify",
    fontStyle: "italic",
    letterSpacing: 1.5,
    marginHorizontal: 10,
  },
});

export default Main;

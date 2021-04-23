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
import results from "./data/results";
import moment from "./vendors/moment";

const ACCENTS = "ÄÅÁÂÀÃäáâàãÉÊËÈéêëèÍÎÏÌíîïìÖÓÔÒÕöóôòõÜÚÛüúûùÇç";
const NO_ACCENTS = "AAAAAAaaaaaEEEEeeeeIIIIiiiiOOOOOoooooUUUuuuuCc";
const LETTERS = "ABCDEFGHIGKLMNOPQRSTUVWXYZ";
const LETTER_VALUE = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];
const VOWELS = "AEIOU";
const VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33];

const Main = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [messagem, setMessagem] = useState("");
  const [resultNumber, setResultNumber] = useState("");

  const onPress = () => {
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

    calculate();
  };

  const calculate = () => {
    var words = name.split(" ");
    var sum = 0;
    var sum_vowels = 0;
    var sum_consonants = 0;

    for (let index = 0; index < words.length; index++) {
      const current = words[index].toUpperCase();

      for (let x = 0; x < current.length; x++) {
        const letter = current
          .slice(x, x + 1)
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (LETTERS.indexOf(letter, 0) !== -1) {
          if (VOWELS.indexOf(letter) !== -1) {
            sum_vowels += LETTER_VALUE[LETTERS.indexOf(letter, 0)];
          } else {
            sum_consonants += LETTER_VALUE[LETTERS.indexOf(letter, 0)];
          }
        }
      }
    }

    sum += process_number(sum_vowels, "vogais");
    sum += process_number(sum_consonants, "consoantes");
    sum = process_number(sum, "soma");

    const msg = results.filter((e) => e.result === sum);

    setMessagem(msg[0].message);
    setResultNumber(sum);
    setShowModal(true);
  };

  const process_number = (number) => {
    var new_number = 0;
    const found = VALUES.find((element) => element === number);

    if (found === undefined) {
      for (let index = 0; index < number.toString().length; index++) {
        new_number += Number(number.toString()[index]);
      }
      new_number = process_number(new_number);
    } else {
      new_number = number;
    }

    return new_number;
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

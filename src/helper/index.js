import { Alert } from "react-native";
import moment from "../vendors/moment";

export const validation = (data) => {
  var result = true;

  data.forEach((element) => {
    if (element.required) {
      if (
        element.value === undefined ||
        element.value === null ||
        element.value === ""
      ) {
        Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
        result = false;
      } else {
        if (!validation_type(element.value, element.type)) {
          result = false;
        }
      }
    } else {
      if (element.value.trim !== "" && element.type !== null) {
        if (!validation_type(element.value, element.type)) {
          result = false;
        }
      }
    }
  });

  return true;
};

const validation_type = (value, type) => {
  if (type === "list") {
    if (value.trim().split(" ").length < 2) {
      Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
      return false;
    }
  }

  if (type === "list") {
    if (!moment(value.split("/").reverse().join("-")).isValid()) {
      Alert.alert(
        "Atenção!",
        "Para prosseguir, informe uma data de nascimento válida."
      );
      return false;
    }
  }

  return true;
};

import { Alert } from "react-native";
import { calculate_astrology_color, calculate_numerology } from "../algorithm";
import {
  ASTROLOGY_COLORS,
  LETTERS,
  LETTER_VALUE,
  NUMEROLOGY,
  VALUES_ASTROLOGY,
  VALUES_NUMEROLOGY,
  VOWELS,
} from "../data";
import moment from "../vendors/moment";

export const numerology = (name, birthday) => {
  const validation_result = validation(name, birthday);

  if (validation_result) {
    let numerology_result = [];
    let { result, message } = calculate_numerology(
      name,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    numerology_result.push({
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

    numerology_result.push({
      title: "Astrologia das Cores...",
      subtitle: `Os astros indicam que pela sua data de nascimento, sua cor predominante é ${color.result.toUpperCase()}!`,
      message: "",
      color: color.message,
    });

    return numerology_result;
  } else {
    return false;
  }
};

export const validation = (name, birthday) => {
  if (name === undefined || name.trim() === "") {
    Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
    return false;
  }

  if (name.split(" ").length < 2) {
    Alert.alert("Atenção!", "Para prosseguir, informe seu nome completo.");
    return false;
  }

  if (birthday === undefined || birthday === "") {
    Alert.alert("Atenção!", "Para prosseguir, informe sua data de nascimento.");
    return false;
  }

  if (!moment(birthday.split("/").reverse().join("-")).isValid()) {
    Alert.alert(
      "Atenção!",
      "Para prosseguir, informe uma data de nascimento válida."
    );
    return false;
  }

  return true;
};

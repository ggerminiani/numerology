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

export const numerology = (name, birthday) => {
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
};

import moment from "../vendors/moment";

export const calculate_numerology = (
  name,
  LETTERS,
  LETTER_VALUE,
  VALUES_NUMEROLOGY,
  NUMEROLOGY,
  VOWELS
) => {
  var words = name.trim().toUpperCase().split(" ");
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
          const { value } = LETTER_VALUE.find((e) => e.letter === letter);
          sum_vowels += value;
        } else {
          const { value } = LETTER_VALUE.find((e) => e.letter === letter);
          sum_consonants += value;
        }
      }
    }
  }

  if (sum_vowels > 0) {
    sum += extract_number(sum_vowels, VALUES_NUMEROLOGY);
  }
  if (sum_consonants > 0) {
    sum += extract_number(sum_consonants, VALUES_NUMEROLOGY);
  }
  if (sum > 0) {
    sum = extract_number(sum, VALUES_NUMEROLOGY);
  }

  const msg = NUMEROLOGY.filter((e) => e.result === sum);
  const result = { result: sum, message: msg[0].message };

  return result;
};

export const extract_number = (number, data) => {
  var new_number = 0;
  const found = data.find((element) => element === number);

  if (found === undefined) {
    for (let index = 0; index < number.toString().length; index++) {
      new_number += Number(number.toString()[index]);
    }
    new_number = extract_number(new_number, data);
  } else {
    new_number = number;
  }

  return new_number;
};

export const calculate_astrology_color = (
  date,
  VALUES_ASTROLOGY,
  ASTROLOGY_COLORS
) => {
  var number = moment(date.split("/").reverse().join("-")).format("DD");
  number = extract_number(number, VALUES_ASTROLOGY);

  var msg = ASTROLOGY_COLORS.filter((e) => e.result === number);
  const result = { result: msg[0].name, message: msg[0].color };

  return result;
};

export const baby_name = (
  parents_result = "",
  family_name = "",
  NAMES = [],
  LETTERS = "",
  LETTER_VALUE = "",
  VALUES_NUMEROLOGY = "",
  NUMEROLOGY = "",
  VOWELS = ""
) => {
  let results = [];
  NAMES.map((e) => {
    //{ key: 1, name: "Aaron", gender: "m", numerology: 4 },

    const new_name = `${e.name} ${family_name}`.toUpperCase();
    const { result } = calculate_numerology(
      new_name,
      LETTERS,
      LETTER_VALUE,
      VALUES_NUMEROLOGY,
      NUMEROLOGY,
      VOWELS
    );

    if (result === parents_result) {
      results.push({
        key: e.key,
        name: e.name.toUpperCase(),
        full_name: new_name,
        gender: e.gender,
        numerology: result,
      });
    }
  });

  return results;
};

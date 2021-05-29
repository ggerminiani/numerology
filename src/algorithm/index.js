import { addData, getData, setData } from "../data/asyncstorage";
import moment from "../vendors/moment";

const KEY_STORAGE_PHRASES = "phrases";
const KEY_STORAGE_HOROSCOPE = "horoscope";

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

export const phrase_daily = async (PHRASES) => {
  const min = 0;
  const max = PHRASES.length;
  const data = await getData(KEY_STORAGE_PHRASES);
  const key_date = moment().format("YYYY-MM-DD");

  let random = random_number_range(min, max);
  let phrase_key = PHRASES[random].key;
  let phrase_obj = { [key_date]: phrase_key };

  if (data === null) {
    await setData(KEY_STORAGE_PHRASES, phrase_obj);
  } else {
    const values = JSON.parse(data);

    if (Object.keys(values).indexOf(key_date) === -1) {
      let skip = false;
      do {
        if (values[key_date] === phrase_key) {
          random = random_number_range();
          phrase_key = PHRASES[random].key;
        } else {
          phrase_obj = { [key_date]: phrase_key };
          await addData(KEY_STORAGE_PHRASES, phrase_obj);
          skip = true;
        }
      } while (!skip);
    } else {
      phrase_key = values[key_date];
    }
  }

  phrase_obj = PHRASES.find((e) => e.key === phrase_key);
  const { author, key, phrase } = phrase_obj;
  const result = { author, key, phrase, date: key_date };

  return result;
};

export const random_number_range = (min = 0, max = 5) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const phrases_data = async (PHRASES) => {
  const data = await getData(KEY_STORAGE_PHRASES);

  if (data === null) {
    return null;
  }

  const values = JSON.parse(data);
  let result = [];
  var obj = Object.keys(values);

  for (let index = obj.length - 1; index > -1; index--) {
    const date = obj[index];
    const phrase_key = values[obj[index]];
    const { author, key, phrase } = PHRASES.find((e) => e.key === phrase_key);
    result.push({ date, key, author, phrase });
  }

  return result;
};

export const horoscope_day = async (maximum) => {
  const min = 0;
  const max = maximum;
  const data = await getData(KEY_STORAGE_HOROSCOPE);
  const key_date = moment().format("YYYY-MM-DD");

  let random = random_number_range(min, max);
  let phrase_obj = { [key_date]: random };

  if (data === null) {
    await setData(KEY_STORAGE_HOROSCOPE, phrase_obj);
  } else {
    const values = JSON.parse(data);
    if (values[Object.keys(values).indexOf(key_date)] === undefined) {
      await addData(KEY_STORAGE_HOROSCOPE, phrase_obj);
    } else {
      random = values[key_date];
    }
  }

  return random;
};

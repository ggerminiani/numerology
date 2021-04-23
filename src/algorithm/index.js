export const calculate_numerology = (
  name,
  LETTERS,
  LETTER_VALUE,
  VALUES_NUMEROLOGY,
  NUMEROLOGY
) => {
  var words = name.trim().split(" ");
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

  sum += extract_number(sum_vowels, VALUES_NUMEROLOGY);
  sum += extract_number(sum_consonants, VALUES_NUMEROLOGY);
  sum = extract_number(sum, VALUES_NUMEROLOGY);

  const msg = NUMEROLOGY.filter((e) => e.result === sum);
  const result = { result: sum, message: msg };

  return result;
};

export const extract_number = (number, data) => {
  var new_number = 0;
  const found = data.find((element) => element === number);

  if (found === undefined) {
    for (let index = 0; index < number.toString().length; index++) {
      new_number += Number(number.toString()[index]);
    }
    new_number = extract_number(new_number);
  } else {
    new_number = number;
  }

  return new_number;
};

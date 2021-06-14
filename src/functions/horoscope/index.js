import moment from "../../vendors/moment";
import { extract_horoscope_bidu } from "./joaobidu";
import { extract_horoscope_meu } from "./meuhoroscopo/";
import { extract_horoscope_virtual } from "./virtual/";

const SIGNS_LIST = [
  { initial: 321, final: 419, zodiac: "aries", name: "áries" },
  { initial: 420, final: 520, zodiac: "touro", name: "touro" },
  { initial: 521, final: 621, zodiac: "gemeos", name: "gêmeos" },
  { initial: 622, final: 722, zodiac: "cancer", name: "câncer" },
  { initial: 723, final: 822, zodiac: "leao", name: "leão" },
  { initial: 823, final: 922, zodiac: "virgem", name: "virgem" },
  { initial: 923, final: 1022, zodiac: "libra", name: "libra" },
  { initial: 1023, final: 1121, zodiac: "escorpiao", name: "escorpião" },
  { initial: 1122, final: 1221, zodiac: "sagitario", name: "sagitário" },
  { initial: 1222, final: 1231, zodiac: "capricornio", name: "capricórnio" },
  { initial: 101, final: 119, zodiac: "capricornio", name: "capricórnio" },
  { initial: 120, final: 218, zodiac: "aquario", name: "aquário" },
  { initial: 219, final: 320, zodiac: "peixes", name: "peixes" },
];

export const horoscope = async (horoscope_key = 0, birthday) => {
  const date_range = Number(
    moment(birthday.split("/").reverse().join("-")).format("MMDD")
  );

  let data = "";
  SIGNS_LIST.map((e) => {
    if (date_range >= Number(e.initial) && date_range <= Number(e.final)) {
      data = e;
    }
  });

  const { initial, final, zodiac, name } = data;

  let result = "";

  switch (horoscope_key) {
    case 0:
      result = await extract_horoscope_bidu(zodiac, name);
      break;
    case 1:
      result = await extract_horoscope_virtual(zodiac, name);
      break;
    case 2:
      result = await extract_horoscope_meu(zodiac, name);
      break;
  }

  return result;
};

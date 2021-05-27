import { Alert } from "react-native";
import moment from "../../vendors/moment";
import { extract_horoscope_bidu } from "./joaobidu";
import { extract_horoscope_meu } from "./meuhoroscopo/";
import { extract_horoscope_virtual } from "./virtual/";

const sites = [
  { key: 0, site: "bidu" },
  { key: 1, site: "meu" },
];

const SIGNS_LIST = [
  { initial: "0121", final: "0218", sign: "aquario", name: "aquário" },
  { initial: "0219", final: "0320", sign: "peixes", name: "peixes" },
  { initial: "0321", final: "0420", sign: "aries", name: "áries" },
  { initial: "0421", final: "0520", sign: "touro", name: "touro" },
  { initial: "0521", final: "0620", sign: "gemeos", name: "gêmeos" },
  { initial: "0621", final: "0722", sign: "cancer", name: "câncer" },
  { initial: "0723", final: "0822", sign: "leao", name: "leão" },
  { initial: "0823", final: "0922", sign: "virgem", name: "virgem" },
  { initial: "0923", final: "1022", sign: "libra", name: "libra" },
  { initial: "1023", final: "1121", sign: "escorpiao", name: "escorpião" },
  { initial: "1122", final: "1221", sign: "sagitario", name: "sagitário" },
  { initial: "1222", final: "0120", sign: "capricornio", name: "capricórnio" },
];

export const horoscope = async (horoscope_key = 0, birthday) => {
  const validation_result = validation(birthday);

  if (validation_result) {
    const date_range = Number(
      moment(birthday.split("/").reverse().join("-")).format("MMDD")
    );

    let data = "";
    SIGNS_LIST.map((e) => {
      if (date_range >= Number(e.initial) && date_range <= Number(e.final)) {
        data = e;
      }
    });

    const { initial, final, sign, name } = data;

    let result = "";

    switch (horoscope_key) {
      case 0:
        result = await extract_horoscope_bidu(sign, name);
        break;
      case 1:
        result = await extract_horoscope_virtual(sign, name);
        break;
      case 2:
        result = await extract_horoscope_meu(sign, name);
        break;
    }

    return result;
  } else {
    return false;
  }
};

export const validation = (birthday) => {
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

import cheerio from "cheerio";
import { getURL } from "../getURL";

const BASE_URL = "https://www.horoscopovirtual.com.br/horoscopo/";

export const extract_horoscope_virtual = async (zodiac, name) => {
  console.log("extract_horoscope_virtual");

  const url = BASE_URL.concat(zodiac);
  const html = await getURL(url);

  if (html !== false) {
    const $ = cheerio.load(html);
    const paragraphs = $("p.text-pred").text();
    let horoscope = $("p.text-pred")
      .text()
      .concat("\n")
      .concat($("div.mod-astral p").text());
    let details = [];

    const result = { horoscope, details, zodiac, name };
    return result;
  } else {
    return false;
  }
};

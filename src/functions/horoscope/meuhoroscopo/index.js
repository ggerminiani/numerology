import cheerio from "cheerio";
import { getURL } from "../getURL";

const BASE_URL = "https://www.meu-horoscopo-do-dia.com/horoscopos/hoje/";
const EXTENSION = ".html";

export const extract_horoscope_meu = async (sign, name) => {
  console.log("extract_horoscope_meu");
  const url = BASE_URL.concat(sign).concat(EXTENSION);
  const html = await getURL(url);

  if (html !== false) {
    const $ = cheerio.load(html);

    const paragraphs = $("div#content_intro");
    const sections = $("div.horo_content_c");
    let horoscope = "";
    let details = [];

    console.log("paragraphs.text()", $(paragraphs).find("p").text());

    $(paragraphs).each((i, el) => {
      console.log("paragraphs");
      console.log(i, $(el).text());
      horoscope = $(el).text().trim();
    });

    $(sections).each((i, el) => {
      var key = $(el).find("h3").text().trim().toLocaleLowerCase();
      var value = $(el).find("p").text().trim().toLocaleLowerCase();
      if (value.endsWith(".")) {
        value = value.substring(0, value.length - 1);
      }

      console.log("key", key);
      console.log("value", value);

      details.push({
        key,
        value,
      });
    });

    const result = { horoscope, details, sign, name };
    return result;
  } else {
    return false;
  }
};

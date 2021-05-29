import cheerio from "cheerio";
import { getURL } from "../getURL";

const BASE_URL = "https://www.meu-horoscopo-do-dia.com/horoscopos/hoje/";
const EXTENSION = ".html";

export const extract_horoscope_meu = async (zodiac, name) => {
  console.log("extract_horoscope_meu");
  const url = BASE_URL.concat(zodiac).concat(EXTENSION);
  const html = await getURL(url);
  console.log("url", url);

  if (html !== false) {
    const $ = cheerio.load(html);
    console.log("1");

    const xxx = $("div");
    const xx2 = $("div").find('id="content_intro"');

    const sections = $("div.horo_content_c");
    let horoscope = "";
    let details = [];

    $(xx2).each((i, el) => {
      console.log("2");

      console.log("xx2", $(el));
    });

    $(xxx).each((i, el) => {
      if ($(el).attr("class") === "txt") {
        console.log($(el).attr(), $(el).attr("class"));
        console.log("inside");
        console.log(i);
        console.log($(el).text());
      }
    });

    console.log("3");
    // console.log("paragraphs.text()", $(paragraphs).find("p").text());

    // $(paragraphs).each((i, el) => {
    //   console.log("paragraphs");
    //   console.log(i, $(el).text());
    //   horoscope = $(el).text().trim();
    // });

    // $(sections).each((i, el) => {
    //   var key = $(el).find("h3").text().trim().toLocaleLowerCase();
    //   var value = $(el).find("p").text().trim().toLocaleLowerCase();
    //   if (value.endsWith(".")) {
    //     value = value.substring(0, value.length - 1);
    //   }

    //   console.log("key", key);
    //   console.log("value", value);

    //   details.push({
    //     key,
    //     value,
    //   });
    // });

    const result = { horoscope, details, zodiac, name };
    return result;
  } else {
    return false;
  }
};

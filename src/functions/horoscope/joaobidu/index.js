import cheerio from "cheerio";
import { getURL } from "../getURL";

const BASE_URL = "https://joaobidu.com.br/horoscopo/signos/previsao-";

export const extract_horoscope = async (sign, name) => {
  const url = BASE_URL.concat(sign);
  const html = await getURL(url);

  if (html !== false) {
    const $ = cheerio.load(html);
    const paragraphs = $("div.texto p");
    const sections = $("div.texto section#mais-sobre-signos ul li");
    let horoscope = "";
    let details = [];

    $(paragraphs).each((i, el) => {
      if (
        $(el).attr("style") === "line-height: 18px;" ||
        $(el).attr("style") === "margin-bottom: 0;"
      ) {
        null;
      } else {
        if ($(el).attr("style") === "text-align: justify") {
          let text = $(el).text().trim();

          for (let index = 0; index < text.length; index++) {
            if (text[index] === "\n" || text[index] === "s") {
              text = text.substring(1, text.length);
            } else {
              break;
            }
          }

          if (text.indexOf("-") !== -1 && text.indexOf("-") <= 4) {
            text = text.substring(text.indexOf("-") + 1, text.length);
          }

          horoscope = text.trim();
        } else {
          let text = $(el).text().trim();

          for (let index = 0; index < text.length; index++) {
            if (text[index] === "\n" || text[index] === "s") {
              text = text.substring(1, text.length);
            } else {
              break;
            }
          }

          if (text.indexOf("-") !== -1 && text.indexOf("-") <= 4) {
            text = text.substring(text.indexOf("-") + 1, text.length);
          }

          if (text.indexOf("\n") !== -1) {
            const items = text.split("\n");
            items.map((e) => {
              if (text.indexOf(":") !== -1) {
                const subitems = e.split(":");
                let value = subitems[1].trim().toLocaleLowerCase();
                if (value.endsWith(".")) {
                  value = value.substring(0, value.length - 1);
                }
                details.push({
                  key: subitems[0].trim().toLocaleLowerCase(),
                  value,
                });
              }
            });
          }
        }
      }
    });

    $(sections).each((i, el) => {
      if ($(el).text().trim().indexOf(":") !== -1) {
        const subitems = $(el).text().trim().split(":");
        let value = subitems[1].trim().toLocaleLowerCase();
        if (value.endsWith(".")) {
          value = value.substring(0, value.length - 1);
        }
        details.push({
          key: subitems[0].trim().toLocaleLowerCase(),
          value,
        });
      }
    });

    const result = { horoscope, details, sign, name };
    return result;
  } else {
    return false;
  }
};

import axios from "axios";

export const getURL = async (URL) => {
  try {
    const data = await axios.get(URL);

    if (data.status === 200) {
      return data.data;
    } else {
      return false;
    }
  } catch (error) {
    console.error("axios get url error -> ", error);
    return false;
  }
};

import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  console.log("AsyncStorage", AsyncStorage);
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log("jsonValue", jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

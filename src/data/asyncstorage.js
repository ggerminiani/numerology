import AsyncStorage from "@react-native-async-storage/async-storage";

export const setData = async (key, value) => {
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

export const addData = async (key, value) => {
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.mergeItem(key, jsonValue);
    } else {
      await AsyncStorage.mergeItem(key, value);
    }
  } catch (e) {
    console.error(e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (typeof value === "object") {
      return JSON.parse(value);
    } else {
      return value != null ? value : null;
    }
  } catch (e) {
    console.error(e);
  }
};

export const clearData = async (key) => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error(e);
  }
};

export const allKeys = async () => {
  try {
    const data = await AsyncStorage.getAllKeys();
    return data;
  } catch (e) {
    console.error(e);
  }
};

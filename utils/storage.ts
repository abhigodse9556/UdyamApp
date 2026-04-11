import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage setItem error:", error);
  }
};

export const getItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Storage getItem error:", error);
    return null;
  }
};

export const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Storage removeItem error:", error);
  }
};

export const getNextSequence = async (ID_SEQ_KEY: string): Promise<number> => {
  try {
    const current = await AsyncStorage.getItem(ID_SEQ_KEY);
    const next = current ? parseInt(current, 10) + 1 : 1;

    await AsyncStorage.setItem(ID_SEQ_KEY, next.toString());
    return next;
  } catch (error) {
    console.error("Sequence generation error:", error);
    return Date.now();
  }
};

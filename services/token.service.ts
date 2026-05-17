import * as SecureStore from "expo-secure-store";
import { Store } from "./graphql/store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";
const USER_ID_KEY = "user_id";

export async function saveTokens(
  accessToken: string,
  refreshToken: string,
  userId: string,
) {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);

  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);

  await SecureStore.setItemAsync(USER_ID_KEY, userId);
}

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
}

export async function getUserId() {
  return SecureStore.getItemAsync(USER_ID_KEY);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);

  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}

export const saveStoreDetails = async (storeDetails: Store) => {
  await SecureStore.setItemAsync("store_details", JSON.stringify(storeDetails));
};

export const getStoreDetails = async (): Promise<Store | null> => {
  const storeDetailsString = await SecureStore.getItemAsync("store_details");
  return storeDetailsString ? JSON.parse(storeDetailsString) : null;
};

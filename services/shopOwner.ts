import { getItem, setItem } from "../utils/storage";

const SHOP_OWNER_KEY = "shop_owner";

export interface ShopOwner {
  id: string;
  name: string;
  shopName: string;
  phone: string;
  address?: string;
}

// Save shop owner (only one)
export const saveShopOwner = async (data: ShopOwner) => {
  await setItem(SHOP_OWNER_KEY, data);
};

// Get shop owner
export const getShopOwner = async (): Promise<ShopOwner | null> => {
  return await getItem(SHOP_OWNER_KEY);
};

// Update shop owner
export const updateShopOwner = async (data: Partial<ShopOwner>) => {
  const existing = await getShopOwner();
  const updated = { ...existing, ...data };
  await setItem(SHOP_OWNER_KEY, updated);
};

// Clear shop owner (optional)
export const clearShopOwner = async () => {
  await setItem(SHOP_OWNER_KEY, null);
};

export default {
  saveShopOwner,
  getShopOwner,
  updateShopOwner,
  clearShopOwner,
};

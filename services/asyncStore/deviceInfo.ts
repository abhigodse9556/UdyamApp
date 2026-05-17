import { getItem, setItem } from "../../utils/storage";

const DEVICE_INFO_KEY = "device_info";

export interface DeviceInfo {
  brand: string;
  manufacturer: string;
  modelName: string;
  osName: string;
  osVersion: string;
}

// Save device info (only one)
export const saveDeviceInfo = async (data: DeviceInfo) => {
  await setItem(DEVICE_INFO_KEY, data);
};

// Get device info
export const getDeviceInfo = async (): Promise<DeviceInfo | null> => {
  return await getItem(DEVICE_INFO_KEY);
};

// Update device info
export const updateDeviceInfo = async (data: Partial<DeviceInfo>) => {
  const existing = await getDeviceInfo();
  const updated = { ...existing, ...data };
  await setItem(DEVICE_INFO_KEY, updated);
};

// Clear device info (optional)
export const clearDeviceInfo = async () => {
  await setItem(DEVICE_INFO_KEY, null);
};

export default {
  saveDeviceInfo,
  getDeviceInfo,
  updateDeviceInfo,
  clearDeviceInfo,
};

import { PrefixType } from "@/constants/prefix";
import { getNextSequence } from "./counter.service";

const pad = (num: number, size = 4) => {
  return String(num).padStart(size, "0");
};

const getDate = () => {
  const now = new Date();

  const yy = now.getFullYear().toString().slice(-2);

  const mm = String(now.getMonth() + 1).padStart(2, "0");

  const dd = String(now.getDate()).padStart(2, "0");

  return `${yy}${mm}${dd}`;
};

export const generateBusinessNumber = async (prefix: PrefixType) => {
  const date = getDate();

  const storeCode = "STORE001"; // Replace with actual store code retrieval logic

  const sequenceKey = `${prefix}-${storeCode}-${date}`;

  const sequence = await getNextSequence(sequenceKey);

  return `${prefix}-${storeCode}-${date}-${pad(sequence)}`;
};

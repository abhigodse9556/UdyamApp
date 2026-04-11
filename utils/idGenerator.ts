import { getNextSequence } from "./storage";

const generateId = async (ID_SEQ_KEY: string, entityInitial: string) => {
  const idSeq = await getNextSequence(ID_SEQ_KEY);
  return `UA-${idSeq}${entityInitial}`;
};

export default generateId;

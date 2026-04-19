export const trimObjectStrings = <T>(obj: T): T => {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "string") {
    return obj.trim() as T;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => trimObjectStrings(item)) as T;
  }

  if (typeof obj === "object") {
    const newObj: any = {};
    for (const key in obj) {
      newObj[key] = trimObjectStrings((obj as any)[key]);
    }
    return newObj;
  }

  return obj; // number, boolean, etc.
};

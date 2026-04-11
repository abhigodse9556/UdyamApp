const generateId = (entityInitial: string) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substr(2, 5);
  return `UA${entityInitial}-${timestamp}_${randomString}`;
};

export default generateId;

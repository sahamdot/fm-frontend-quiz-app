export const removeKeyFromObject = <O extends object, K extends keyof O>(
  object: O,
  key: K,
): Omit<O, K> => {
  const newObject = { ...object };
  delete newObject[key];
  return newObject;
};

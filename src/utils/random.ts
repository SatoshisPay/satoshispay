const getRandomValues = global.crypto.getRandomValues;

export const generateEntropy = () => {
  const randomBytes = new Uint8Array(16);
  const entropy = getRandomValues(randomBytes);

  return entropy;
};

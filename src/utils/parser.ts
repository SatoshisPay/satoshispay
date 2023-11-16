export const isBtcAddress = (address: string): boolean => {
  return address.match(/^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/) !== null;
};

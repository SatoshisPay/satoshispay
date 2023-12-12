import { Platform } from 'react-native';

export const isAndroid = () => {
  return Platform.OS === 'android';
};

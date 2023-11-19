import React from 'react';
import { View, ActivityIndicator } from 'react-native';

interface Props {
  children: React.ReactNode;
  size?: number;
  bgColor?: string;
}

const Spinner = ({ children, size, bgColor }: Props) => (
  <View
    className={`flex flex-col items-center justify-center ${
      bgColor ?? 'bg-white'
    } px-2 py-8 rounded-xl`}>
    <ActivityIndicator size={size ?? 128} color="#F7931A" />
    {children}
  </View>
);

export default Spinner;

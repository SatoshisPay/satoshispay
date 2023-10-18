import React from 'react';
import { View } from 'react-native';

interface Props {
  children: React.ReactNode;
}

const ButtonBox = (props: Props) => (
  <View className="flex-1 bg-slate-100 border border-gray-200 shadow-xl rounded-xl m-1">
    {props.children}
  </View>
);

export default ButtonBox;

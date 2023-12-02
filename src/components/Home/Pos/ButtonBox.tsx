import React from 'react';
import { View } from 'react-native';

interface Props {
  disabled?: boolean;
  children: React.ReactNode;
}

const ButtonBox = (props: Props) => (
  <View
    className={`${
      props.disabled ? 'bg-gray-200' : 'bg-slate-100'
    } flex-1 border border-gray-200 shadow-xl rounded-xl m-1`}>
    {props.children}
  </View>
);

export default ButtonBox;

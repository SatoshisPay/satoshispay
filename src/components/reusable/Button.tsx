import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Primary = ({ onPress, disabled, children }: Props) => (
  <TouchableOpacity
    className={`${
      disabled ? 'bg-brandAlt' : 'bg-brand'
    } flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300`}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

export default {
  Primary,
};

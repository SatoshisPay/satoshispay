import React from 'react';
import { TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

const Primary = ({ onPress, disabled, children, className }: Props) => (
  <TouchableOpacity
    className={`${className} ${
      disabled ? 'bg-brandAlt' : 'bg-brand'
    } flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300`}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

const Secondary = ({ onPress, disabled, children, className }: Props) => (
  <TouchableOpacity
    className={`${className} ${
      disabled ? 'bg-gray-300' : 'bg-gray-50'
    } flex-row items-center justify-center rounded-lg p-4 mt-4 shadow-lg border border-gray-300`}
    onPress={onPress}
    disabled={disabled}>
    {children}
  </TouchableOpacity>
);

export default {
  Primary,
  Secondary,
};

import React from 'react';
import { View, Text, TextInput, InputModeOptions } from 'react-native';

interface Props {
  onChangeText: (text: string) => void;
  label: string;
  placeholder?: string;
  keyboardType?: InputModeOptions;
  value?: string;
}

const Input = ({
  value,
  onChangeText,
  label,
  placeholder,
  keyboardType,
}: Props) => (
  <View className="mt-4 w-page">
    <Text className=" text-text py-1 text-lg">{label}</Text>
    <View className="flex flex-row items-center justify-center bg-gray-50 border border-gray-300 h-min w-full">
      <TextInput
        className="w-full text-text text-sm rounded-lg focus:ring-brand focus:border-brand p-4 focus-visible:outline-none"
        placeholder={placeholder}
        onChangeText={onChangeText}
        defaultValue={value}
        inputMode={keyboardType}
      />
    </View>
  </View>
);

export default Input;

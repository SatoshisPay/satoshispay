import React from 'react';
import { TextInput, Text, View } from 'react-native';

interface Props {
  number: number;
  word: string;
  onWordChanged: (index: number, word: string) => void;
}
const WordForm = ({ number, word, onWordChanged }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between my-2">
      <Text className="text-xl">{number}.</Text>
      <TextInput
        className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl"
        value={word}
        onChangeText={text => onWordChanged(number, text)}
      />
    </View>
  );
};

export default WordForm;

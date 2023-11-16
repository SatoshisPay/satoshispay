import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  mnemonicNum: number;
  mnemonic1: string;
  mnemonic2: string;
}

const MnemonicRow = (props: Props) => (
  <View className="flex flex-row justify-around w-full pb-4">
    <View className="w-6/12 flex flex-row items-center">
      <Text>{props.mnemonicNum}.</Text>
      <Text className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl">
        {props.mnemonic1}
      </Text>
    </View>
    <View className="w-6/12 flex flex-row items-center">
      <Text>{props.mnemonicNum + 1}.</Text>
      <Text className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl">
        {props.mnemonic2}
      </Text>
    </View>
  </View>
);

export default MnemonicRow;

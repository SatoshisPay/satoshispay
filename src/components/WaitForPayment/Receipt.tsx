import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Check } from 'react-native-feather';

interface Props {
  onGoHomeClicked: () => void;
}

const Receipt = (props: Props) => (
  <View className="flex flex-col items-center justify-center bg-white px-2 py-8 rounded-xl">
    <View className="rounded-full bg-green-500">
      <Check className="text-white" width={96} height={96} />
    </View>
    <Text className="text-brandAlt w-full px-4 text-2xl text-center">
      Transazione completata{'\n'}con successo!
    </Text>
    <TouchableOpacity
      onPress={props.onGoHomeClicked}
      className="bg-brandAlt p-2 rounded-lg mt-4">
      <Text className="text-white text-2xl">Torna alla home</Text>
    </TouchableOpacity>
  </View>
);

export default Receipt;

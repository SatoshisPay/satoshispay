import React from 'react';
import { View, Text } from 'react-native';
import { ArrowRight, Check } from 'react-native-feather';
import Button from '../reusable/Button';

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
    <Button.Secondary onPress={props.onGoHomeClicked}>
      <Text className="text-brandAlt text-2xl">Torna alla home</Text>
      <ArrowRight className="text-brandAlt ml-2" />
    </Button.Secondary>
  </View>
);

export default Receipt;

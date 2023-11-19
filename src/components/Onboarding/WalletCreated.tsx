import React from 'react';
import { Text, View } from 'react-native';
import Mnemonic from '../reusable/Mnemonic';
import Button from '../reusable/Button';
import { ArrowRight } from 'react-native-feather';

interface Props {
  mnemonic: string[];
  onCompleted: () => void;
}

const WalletCreated = ({ mnemonic, onCompleted }: Props) => {
  return (
    <View className="flex flex-col w-full">
      <Mnemonic mnemonic={mnemonic} />
      <View className="flex flex-row items-center justify-center w-full pb-8">
        <Button.Primary onPress={onCompleted}>
          <Text className="text-white text-center text-lg">Procedi</Text>
          <ArrowRight className="inline text-white ml-2" />
        </Button.Primary>
      </View>
    </View>
  );
};

export default WalletCreated;

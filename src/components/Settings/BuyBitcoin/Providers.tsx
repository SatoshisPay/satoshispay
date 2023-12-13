import { BuyBitcoinProvider } from '@breeztech/react-native-breez-sdk';
import * as React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Moonpay from './logos/Moonpay';

interface Props {
  onProviderChange: (provider: BuyBitcoinProvider) => void;
}

const Providers = ({ onProviderChange }: Props) => (
  <View className="w-page mx-auto py-2">
    <Text className="text-2xl text-center">
      Seleziona una piattaforma dove acquistare Bitcoin
    </Text>
    <ScrollView className="w-full">
      <Provider
        logo={<Moonpay />}
        provider={BuyBitcoinProvider.MOONPAY}
        onChange={onProviderChange}
      />
    </ScrollView>
  </View>
);

export default Providers;

interface ProviderProps {
  logo: React.ReactNode;
  provider: BuyBitcoinProvider;
  onChange: (provider: BuyBitcoinProvider) => void;
}

const Provider = ({ logo, provider, onChange }: ProviderProps) => (
  <TouchableOpacity
    className="flex flex-col justify-center items-center border-2 border-gray-200 w-full h-[128px] rounded-xl shardow-xl my-2 p-8"
    onPress={() => onChange(provider)}>
    {logo}
  </TouchableOpacity>
);

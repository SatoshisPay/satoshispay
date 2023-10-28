import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const WaitForWithdraw = () => (
  <View className="flex flex-col items-center justify-center px-2 py-8 rounded-xl w-full h-full">
    <ActivityIndicator size={128} color="#F7931A" />
    <Text className="text-brandAlt w-full px-4 text-2xl text-center">
      Prelievo in corso{'\n'}Attendere, prego...
    </Text>
  </View>
);

export default WaitForWithdraw;

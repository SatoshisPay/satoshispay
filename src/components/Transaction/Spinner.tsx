import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Spinner = () => (
  <View className="flex flex-col items-center justify-center bg-white px-2 py-8 rounded-xl">
    <ActivityIndicator size="large" color="#F7931A" />
    <Text className="text-brandAlt w-full px-4 text-2xl text-center">
      Sto preparando l'ordine...
    </Text>
  </View>
);

export default Spinner;

import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

const Spinner = () => (
  <View className="flex flex-col items-center justify-center bg-white px-2 py-8 rounded-xl">
    <ActivityIndicator size={128} color="#F7931A" />
    <Text className="text-brandAlt w-full px-4 text-2xl text-center">
      Attendi mentre la{`\n`}transazione viene elaborata...
    </Text>
    <Text className="text-brandAlt w-full px-4 text-sm text-center mt-8">
      Puoi tornare alla home se vuoi,{`\n`}la transazione verrà registrata in
      background
    </Text>
  </View>
);

export default Spinner;

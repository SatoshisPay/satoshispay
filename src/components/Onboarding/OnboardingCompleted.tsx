import React from 'react';
import { Text, View } from 'react-native';
import Spinner from '../reusable/Spinner';

const OnboardingCompleted = () => (
  <View className="items-center flex flex-col justify-center h-screen">
    <Spinner bgColor="bg-transparent">
      <Text className="text-2xl text-center">
        Il tuo wallet è pronto!{'\n'}Ti stiamo connettendo a Lightning
        Network...
      </Text>
    </Spinner>
  </View>
);

export default OnboardingCompleted;

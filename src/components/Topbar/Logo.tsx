import React from 'react';
import { Image, View } from 'react-native';

const Logo = () => (
  <View className="w-[64] h-[64] flex justify-center items-center">
    <Image
      className="w-[48] h-[48]"
      source={require('../../../assets/logo-alt.png')}
    />
  </View>
);

export default Logo;

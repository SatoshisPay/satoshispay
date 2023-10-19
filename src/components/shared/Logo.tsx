import React from 'react';
import { Image } from 'react-native';

const Logo = () => (
  <Image
    className="w-[64] h-[64]"
    source={require('../../../assets/logo.png')}
  />
);

export default Logo;

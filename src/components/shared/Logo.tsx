import React from 'react';
import { Image } from 'react-native';

const Logo = () => (
  <Image
    style={{ width: 64, height: 64 }}
    source={require('../../../assets/logo.png')}
  />
);

export default Logo;

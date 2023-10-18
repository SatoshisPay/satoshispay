import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Pos from '../components/Home/Pos';
import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';

type Props = NativeStackScreenProps<RootStackParamList, Page.HOME>;

const Home = ({ navigation }: Props): JSX.Element => {
  const onPosSubmit = (charge: Decimal) => {
    navigation.navigate(Page.TRANSACTION, { charge: charge.toFixed(2) });
  };

  return (
    <View className="flex flex-col items-center justify-center w-full">
      <Pos onSubmitted={onPosSubmit} />
    </View>
  );
};

export default Home;

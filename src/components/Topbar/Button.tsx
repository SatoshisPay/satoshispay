import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Clock, Home, CreditCard } from 'react-native-feather';

import Page, { RootStackParamList } from '../../pages/pages';

type Props = NativeStackScreenProps<
  RootStackParamList,
  keyof RootStackParamList
>;

const History = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.HISTORY);
    }}>
    <Clock fill="#ffffff" color="#F7931A" />
  </TouchableOpacity>
);

const Wallet = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.WALLET);
    }}>
    <CreditCard fill="#ffffff" color="#F7931A" />
  </TouchableOpacity>
);

const HomeBtn = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.HOME);
    }}>
    <Home fill="#ffffff" color="#F7931A" />
  </TouchableOpacity>
);

export default {
  History,
  Home: HomeBtn,
  Wallet,
};

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Clock,
  Home,
  CreditCard,
  Settings as SettingsIcon,
} from 'react-native-feather';

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
    <Clock color="white" width={32} height={32} />
  </TouchableOpacity>
);

const Wallet = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.WALLET);
    }}>
    <CreditCard color="white" width={32} height={32} />
  </TouchableOpacity>
);

const Settings = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.SETTINGS);
    }}>
    <SettingsIcon color="white" width={32} height={32} />
  </TouchableOpacity>
);

const HomeBtn = ({ navigation }: Props) => (
  <TouchableOpacity
    className="mx-2"
    onPress={() => {
      navigation.navigate(Page.HOME);
    }}>
    <Home color="white" width={32} height={32} />
  </TouchableOpacity>
);

export default {
  History,
  Home: HomeBtn,
  Settings,
  Wallet,
};

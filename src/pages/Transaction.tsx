import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';

type Props = NativeStackScreenProps<RootStackParamList, Page.TRANSACTION>;

const Transaction = (props: Props): JSX.Element => {
  const { navigation } = props;

  React.useEffect(() => {}, []);

  return (
    <View className="flex flex-col items-center justify-center w-full">
      <Text>Vojo {props.route.params.charge} euro</Text>
    </View>
  );
};

export default Transaction;

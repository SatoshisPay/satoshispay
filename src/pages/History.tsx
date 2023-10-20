import React from 'react';
import { Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Orders from '../components/History/Orders';

type Props = NativeStackScreenProps<RootStackParamList, Page.HISTORY>;

const History = ({}: Props) => (
  <Activity.ListPage>
    <Text className="text-center text-2xl text-brandAlt">Transazioni</Text>
    <Orders />
  </Activity.ListPage>
);

export default History;

import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';

type Props = NativeStackScreenProps<RootStackParamList, Page.ONBOARDING>;

const Onboarding = ({ navigation }: Props) => (
  <Activity.ListPage>
    <View></View>
  </Activity.ListPage>
);

export default Onboarding;

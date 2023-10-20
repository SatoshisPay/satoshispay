import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Pos from '../components/Home/Pos';
import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Activity from '../components/reusable/Activity';

type Props = NativeStackScreenProps<RootStackParamList, Page.HOME>;

const Home = ({ navigation }: Props): JSX.Element => {
  const onPosSubmit = (charge: Decimal) => {
    navigation.navigate(Page.TRANSACTION, { charge: charge.toFixed(2) });
  };

  return (
    <Activity.Page>
      <Pos onSubmitted={onPosSubmit} />
    </Activity.Page>
  );
};

export default Home;

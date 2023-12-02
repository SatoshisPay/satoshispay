import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useBackHandler } from '@react-native-community/hooks';
import Decimal from 'decimal.js';

import Pos from '../components/Home/Pos';
import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import { OrderType } from '../data/order';

type Props = NativeStackScreenProps<RootStackParamList, Page.HOME>;

const Home = ({ navigation }: Props): JSX.Element => {
  const [amount, setAmount] = React.useState(new Decimal(0));

  const onPosSubmit = (charge: Decimal) => {
    navigation.navigate(Page.TRANSACTION, {
      charge: charge.toFixed(2),
      orderType: OrderType.LN,
    });
  };

  // handle back button
  useBackHandler(() => {
    if (amount.isZero()) {
      return false;
    } else {
      setAmount(new Decimal(0));
    }
    return true;
  });

  return (
    <Activity.Page>
      <Pos amount={amount} setAmount={setAmount} onSubmitted={onPosSubmit} />
    </Activity.Page>
  );
};

export default Home;

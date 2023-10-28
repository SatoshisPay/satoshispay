import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Pos from '../components/Home/Pos';
import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Activity from '../components/reusable/Activity';
import { breezConnect } from '../api/breez';
import ErrorModal from '../components/shared/ErrorModal';
import { OrderType } from '../data/order';
import WaitForPos from '../components/Home/WaitForPos';

type Props = NativeStackScreenProps<RootStackParamList, Page.HOME>;

const Home = ({ navigation }: Props): JSX.Element => {
  const onPosSubmit = (charge: Decimal) => {
    navigation.navigate(Page.TRANSACTION, {
      charge: charge.toFixed(2),
      orderType: OrderType.LN,
    });
  };
  const [posReady, setPosReady] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    breezConnect()
      .then(() => {
        console.log('connected to breez');
        setPosReady(true);
      })
      .catch(e => {
        if (e.message.includes('already initialized')) {
          setPosReady(true);
        } else {
          console.error(e.message);
          setError('failed to connect to breez');
        }
      });
  }, []);

  return (
    <Activity.Page>
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      {posReady ? <Pos onSubmitted={onPosSubmit} /> : <WaitForPos />}
    </Activity.Page>
  );
};

export default Home;

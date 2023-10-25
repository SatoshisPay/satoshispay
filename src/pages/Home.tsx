import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Pos from '../components/Home/Pos';
import Page, { RootStackParamList } from './pages';
import Decimal from 'decimal.js';
import Activity from '../components/reusable/Activity';
import { breezConnect } from '../api/breez';
import ErrorModal from '../components/shared/ErrorModal';

type Props = NativeStackScreenProps<RootStackParamList, Page.HOME>;

const Home = ({ navigation }: Props): JSX.Element => {
  const onPosSubmit = (charge: Decimal) => {
    navigation.navigate(Page.TRANSACTION, { charge: charge.toFixed(2) });
  };
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    breezConnect()
      .then(() => {
        console.log('connected to breez');
      })
      .catch(e => {
        console.error(e.message);
        setError('failed to connect to breez');
      });
  }, []);

  return (
    <Activity.Page>
      {error && (
        <ErrorModal error={error} onClick={() => setError(undefined)} />
      )}
      <Pos onSubmitted={onPosSubmit} />
    </Activity.Page>
  );
};

export default Home;

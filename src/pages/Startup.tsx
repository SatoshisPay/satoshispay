import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, View } from 'react-native';

import { breezConnect, breezRedeemClosedChannelFunds } from '../api/breez';
import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Spinner from '../components/reusable/Spinner';
import { isLnNodeMnemonicSet } from '../database/keystore';
import Alerts from '../components/reusable/Alerts';
import Button from '../components/reusable/Button';
import { RefreshCcw } from 'react-native-feather';
import SuccessModal from '../components/shared/SuccessModal';
import { info, error as logError, warn } from '../utils/log';

type Props = NativeStackScreenProps<RootStackParamList, Page.STARTUP>;

const Startup = ({ navigation }: Props) => {
  const [error, setError] = React.useState<string>();
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false);
  const [isRedeeming, setIsRedeeming] = React.useState<boolean>(false);
  const [redeemTx, setRedeemTx] = React.useState<{
    txId: string;
    sats: number;
  }>();

  const goHome = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Page.HOME }],
    });
  };

  const onRedeemMessageClose = () => {
    goHome();
  };

  const redeemClosedChannelFunds = () => {
    info('Redeeming closed channel funds...');
    breezRedeemClosedChannelFunds()
      .then(maybeTxId => {
        if (!maybeTxId) {
          setIsRedeeming(false);
          goHome();
        } else {
          setIsRedeeming(false);
          setRedeemTx(maybeTxId);
        }
      })
      .catch(e => {
        logError(e.message);
        goHome();
      });
  };

  const connectToLnNetwork = () => {
    setIsConnecting(true);
    info('Connecting to LN network...');
    breezConnect()
      .then(() => {
        setIsConnecting(false);
        setIsRedeeming(true);
      })
      .catch(e => {
        logError(e.message);
        setError(
          'Impossibile connettersi a Lightning Network, riprova più tardi',
        );
        setIsConnecting(false);
      });
  };

  React.useEffect(() => {
    isAppInitialized()
      .then(initialized => {
        if (initialized) {
          connectToLnNetwork();
        } else {
          navigation.navigate(Page.ONBOARDING);
        }
      })
      .catch(e => {
        warn(e.message);
        setError('Impossibile accedere al database');
      });
  }, []);

  React.useEffect(() => {
    if (isRedeeming) {
      redeemClosedChannelFunds();
    }
  }, [isRedeeming]);

  const state = error ? (
    <View className="flex flex-col items-center justify-center py-4 px-8">
      <Alerts.Danger>
        <Text className="text-red-800">{error}</Text>
      </Alerts.Danger>
      <Button.Primary disabled={isConnecting} onPress={connectToLnNetwork}>
        <Text className="text-white text-xl">Riprova</Text>
        <RefreshCcw className="inline text-white ml-2" />
      </Button.Primary>
    </View>
  ) : (
    <Spinner size={64}>
      <Text className="text-brandAlt w-full px-4 text-md text-center">
        {isConnecting
          ? 'Connessione a Lightning\nNetwork in corso...'
          : 'Rimborso dei fondi sui\ncanali chiusi in corso...'}
      </Text>
    </Spinner>
  );

  return (
    <Activity.Page className="bg-white h-full">
      {redeemTx && (
        <SuccessModal
          message={`${redeemTx.sats} sats rimasti in attesa su dei canali chiusi, inviati sul tuo wallet Lightning: ${redeemTx.txId}. Dovrai attendere qualche minuto prima di vedere il saldo aggiornato.`}
          onClick={onRedeemMessageClose}
        />
      )}
      <View className="bg-white w-full h-screen flex flex-col items-center justify-center">
        <Image
          className="w-[200px] h-[200px] rounded-full"
          source={require('../../assets/logo.png')}
        />
        {state}
      </View>
    </Activity.Page>
  );
};

const isAppInitialized = async () => {
  return await isLnNodeMnemonicSet();
};

export default Startup;

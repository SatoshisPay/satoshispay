import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, View } from 'react-native';

import { breezConnect } from '../api/breez';
import Page, { RootStackParamList } from './pages';
import Activity from '../components/reusable/Activity';
import Spinner from '../components/reusable/Spinner';
import { isLnNodeMnemonicSet } from '../database/keystore';
import Alerts from '../components/reusable/Alerts';
import Button from '../components/reusable/Button';
import { RefreshCcw } from 'react-native-feather';

type Props = NativeStackScreenProps<RootStackParamList, Page.STARTUP>;

const Startup = ({ navigation }: Props) => {
  const [error, setError] = React.useState<string>();
  const [isConnecting, setIsConnecting] = React.useState<boolean>(false);

  const connectToLnNetwork = () => {
    setIsConnecting(true);
    breezConnect()
      .then(() => {
        setIsConnecting(false);
        navigation.reset({
          index: 0,
          routes: [{ name: Page.HOME }],
        });
      })
      .catch(e => {
        console.error(e.message);
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
        console.error(e.message);
        setError('Impossibile accedere al database');
      });
  }, []);

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
        Connessione a Lightning{'\n'}Network in corso...
      </Text>
    </Spinner>
  );

  return (
    <Activity.Page className="bg-white h-full">
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

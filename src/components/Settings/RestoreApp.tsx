import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { resetStorage } from '../../database/keystore';
import Alerts from '../reusable/Alerts';
import { breezDisconnect } from '../../api/breez';
import { ArrowRight } from 'react-native-feather';
import Button from '../reusable/Button';
import { resetDB } from '../../database/database';

interface Props {
  setError: (error: string) => void;
  onRestore: () => void;
}

const RestoreApp = ({ setError, onRestore }: Props) => {
  const [processing, setProcessing] = React.useState(false);
  const [confirmRecovery, setConfirmRecovery] = React.useState(false);

  const onAppRestore = () => {
    setProcessing(true);
    restoreApp()
      .then(() => {
        setProcessing(false);
        onRestore();
      })
      .catch(e => {
        setError(`Errore durante il ripristino dell'app: ${e.message}`);
        setProcessing(false);
      });
  };

  const onSubmit = () => {
    if (!confirmRecovery) {
      setConfirmRecovery(true);
    } else {
      onAppRestore();
    }
  };

  return (
    <ScrollView>
      <View className="flex flex-col py-4 w-page mx-auto">
        <View>
          <Text className="text-3xl text-center">Ripristina l&apos;App</Text>
          <Alerts.Danger className="text-red-800">
            <Text className="w-fit text-lg">
              Prima di procedere con il ripristino, assicurati di avere un
              backup del wallet corrente. Altrimenti non sarai in grado di
              recuperare i fondi attualmente presenti
            </Text>
          </Alerts.Danger>
        </View>
        <View className="flex items-center justify-center">
          {processing ? null : (
            <Button.Primary onPress={onSubmit} disabled={processing}>
              <Text className="text-white text-2xl">
                {confirmRecovery ? 'Conferma ripristino App' : 'Ripristina App'}
              </Text>
              <ArrowRight className="ml-2 text-white" width={24} height={24} />
            </Button.Primary>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const restoreApp = async () => {
  await breezDisconnect();
  await resetStorage();
  await resetDB();
};

export default RestoreApp;

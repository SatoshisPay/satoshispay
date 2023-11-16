import React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { getLnNodeMnemonic } from '../../database/keystore';
import MnemonicRow from './WalletBackup/MnemonicRow';

interface Props {
  setError: (error: string) => void;
}

const WalletBackup = ({ setError }: Props) => {
  const [mnemonic, setMnemonic] = React.useState<string[]>();

  React.useEffect(() => {
    if (!mnemonic) {
      getLnNodeMnemonic()
        .then(memo => {
          setMnemonic(memo.split(' '));
        })
        .catch(e => {
          console.error(e);
          setError(`Errore durante il recupero della frase mnemonica: ${e}`);
        });
    }
  }, [mnemonic]);

  return (
    <ScrollView>
      <View className="flex flex-col py-4 w-page mx-auto">
        <View>
          <Text className="text-3xl text-center">Backup del Wallet</Text>
          <Text className="text-center text-lg pt-4">
            Trascrivi queste parole nell'ordine seguente e custodiscile in un
            luogo sicuro.
          </Text>
          <Text className="text-center text-md pb-4">
            Ti serviranno a recuperare i tuoi fondi in caso di cancellazione
            dell'app o smarrimento del dispositivo.
          </Text>
        </View>
        <MnemonicRow
          mnemonicNum={1}
          mnemonic1={mnemonic ? mnemonic[0] : ''}
          mnemonic2={mnemonic ? mnemonic[1] : ''}
        />
        <MnemonicRow
          mnemonicNum={3}
          mnemonic1={mnemonic ? mnemonic[2] : ''}
          mnemonic2={mnemonic ? mnemonic[3] : ''}
        />
        <MnemonicRow
          mnemonicNum={5}
          mnemonic1={mnemonic ? mnemonic[4] : ''}
          mnemonic2={mnemonic ? mnemonic[5] : ''}
        />
        <MnemonicRow
          mnemonicNum={7}
          mnemonic1={mnemonic ? mnemonic[6] : ''}
          mnemonic2={mnemonic ? mnemonic[7] : ''}
        />
        <MnemonicRow
          mnemonicNum={9}
          mnemonic1={mnemonic ? mnemonic[8] : ''}
          mnemonic2={mnemonic ? mnemonic[9] : ''}
        />
        <MnemonicRow
          mnemonicNum={11}
          mnemonic1={mnemonic ? mnemonic[10] : ''}
          mnemonic2={mnemonic ? mnemonic[11] : ''}
        />
      </View>
    </ScrollView>
  );
};

export default WalletBackup;
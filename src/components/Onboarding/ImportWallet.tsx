import React from 'react';
import { Text, View } from 'react-native';
import * as bip39 from 'bip39';
import { ArrowRight, Clipboard as ClipboardIcon } from 'react-native-feather';

import Button from '../reusable/Button';
import Alerts from '../reusable/Alerts';
import MnemonicForm from '../reusable/MnemonicForm';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
  onConfirm: (mnemonic: string[]) => void;
  processing: boolean;
}

const ImportWallet = ({ onConfirm, processing }: Props) => {
  const [mnemonic, setMnemonic] = React.useState<string[]>(
    Array.from({ length: 12 }, () => ''),
  );
  const [error, setError] = React.useState<string | undefined>();

  const onSubmit = () => {
    if (mnemonic.some(word => word === '')) {
      setError('Tutte le parole devono essere inserite');
      return;
    }

    // verify mnemonic
    const mnemonicWords = mnemonic.join(' ');
    if (!bip39.validateMnemonic(mnemonicWords)) {
      setError('Le parole inserite non sono valide');
      return;
    }

    onConfirm(mnemonic);
  };

  const onMnemonicWordChanged = (number: number, word: string) => {
    const newMnemonic = [...mnemonic];
    newMnemonic[number - 1] = word;
    setMnemonic(newMnemonic);
  };

  const pasteMnemonic = () => {
    Clipboard.getString()
      .then(clipboard => {
        const words = clipboard.split(' ');
        if (words.length !== 12) {
          setError('Il testo incollato non è valido');
          return;
        }
        setMnemonic(words);
        setError(undefined);
      })
      .catch(e => {
        console.error(e.message);
        setError("Errore durante l'accesso al clipboard");
      });
  };

  return (
    <View className="flex flex-col w-full px-8">
      <Text className="text-2xl font-bold text-center pb-4">
        Inserisci le tue 12 parole segrete
      </Text>
      <MnemonicForm
        readOnly={[]}
        mnemonic={mnemonic}
        onMnemonicWordChanged={onMnemonicWordChanged}
      />
      <View className="flex flex-col items-center justify-center w-full pb-8">
        {error && (
          <Alerts.Danger>
            <Text className="text-red-700">{error}</Text>
          </Alerts.Danger>
        )}
        <View className="w-full flex flex-row items-center justify-between">
          <Button.Primary onPress={onSubmit} disabled={processing}>
            <Text className="text-white text-center text-lg">Procedi</Text>
            <ArrowRight className="inline text-white ml-2" />
          </Button.Primary>
          <Button.Secondary onPress={pasteMnemonic} disabled={processing}>
            <Text className="text-center text-lg  text-brandAlt">Incolla</Text>
            <ClipboardIcon className="inline ml-2 text-brandAlt" />
          </Button.Secondary>
        </View>
      </View>
    </View>
  );
};

export default ImportWallet;

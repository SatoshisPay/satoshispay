import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import * as bip39 from 'bip39';

import { setLnNodeMnemonic } from '../../database/keystore';
import Alerts from '../reusable/Alerts';
import { breezRestart } from '../../api/breez';
import WordForm from './RestoreWallet/WordForm';
import { ArrowRight } from 'react-native-feather';
import Button from '../reusable/Button';

interface Props {
  setError: (error: string) => void;
  setSuccess: (success: string) => void;
}

const RestoreWallet = ({ setError, setSuccess }: Props) => {
  const [processing, setProcessing] = React.useState(false);
  const [mnemonic, setMnemonic] = React.useState<string[]>(
    [...Array(12)].map(() => ''),
  );

  const onMnemonicWordChanged = (number: number, word: string) => {
    const newMnemonic = [...mnemonic];
    newMnemonic[number - 1] = word;
    setMnemonic(newMnemonic);
  };

  const onBackupRestore = async () => {
    if (mnemonic.some(word => word === '')) {
      setError('Tutte le parole devono essere inserite');
      return;
    }

    const mnemonicWords = mnemonic.join(' ');
    try {
      bip39.mnemonicToSeedSync(mnemonicWords);
    } catch (e) {
      setError('Le parole inserite non sono valide');
      return;
    }
    setProcessing(true);

    setLnNodeMnemonic(mnemonicWords)
      .then(() => {
        breezRestart()
          .then(() => {
            setProcessing(false);
            setSuccess('Wallet ripristinato con successo');
          })
          .catch(e => {
            setProcessing(false);
            setError(`Errore durante il ripristino del wallet: ${e}`);
          });
      })
      .catch(e => {
        setProcessing(false);
        setError(`Errore durante il ripristino del wallet: ${e}`);
      });
  };

  const btnDisabled = mnemonic.some(word => word === '') || processing;

  return (
    <ScrollView>
      <View className="flex flex-col py-4 w-page mx-auto">
        <View>
          <Text className="text-3xl text-center">Ripristina il Wallet</Text>
          <Alerts.Danger className="text-red-800">
            <Text className="w-fit text-lg">
              Prima di procedere con il ripristino, assicurati di avere un
              backup del wallet corrente. Altrimenti non sarai in grado di
              recuperare i fondi. attualmente presenti
            </Text>
          </Alerts.Danger>
        </View>
        <View className="flex flex-col justify-center items-center">
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={1}
                word={mnemonic[0]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={2}
                word={mnemonic[1]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={3}
                word={mnemonic[2]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={4}
                word={mnemonic[3]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={5}
                word={mnemonic[4]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={6}
                word={mnemonic[5]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={7}
                word={mnemonic[6]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={8}
                word={mnemonic[7]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={9}
                word={mnemonic[8]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={10}
                word={mnemonic[9]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex flex-row justify-around w-full pb-4">
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={11}
                word={mnemonic[10]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
            <View className="w-6/12 flex flex-row items-center">
              <WordForm
                number={12}
                word={mnemonic[11]}
                onWordChanged={onMnemonicWordChanged}
              />
            </View>
          </View>
          <View className="flex items-center justify-center">
            <Button.Primary onPress={onBackupRestore} disabled={btnDisabled}>
              <Text className="text-white text-2xl">Ripristina</Text>
              <ArrowRight className=" text-white" width={24} height={24} />
            </Button.Primary>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RestoreWallet;

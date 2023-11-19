import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { Copy } from 'react-native-feather';
import Button from './Button';

interface MnemonicRowProps {
  mnemonicNum: number;
  mnemonic1: string;
  mnemonic2: string;
}

const MnemonicRow = (props: MnemonicRowProps) => (
  <View className="flex flex-row justify-around w-full pb-4">
    <View className="w-6/12 flex flex-row items-center">
      <Text>{props.mnemonicNum}.</Text>
      <Text className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl">
        {props.mnemonic1}
      </Text>
    </View>
    <View className="w-6/12 flex flex-row items-center">
      <Text>{props.mnemonicNum + 1}.</Text>
      <Text className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl">
        {props.mnemonic2}
      </Text>
    </View>
  </View>
);

interface Props {
  mnemonic: string[];
}

const Mnemonic = ({ mnemonic }: Props) => {
  const onCopyWords = () => {
    Clipboard.setString(mnemonic?.join(' ') || '');
  };

  return (
    <ScrollView>
      <View className="flex flex-col py-4 w-page mx-auto">
        <View>
          <Text className="text-3xl text-center">Secret Phrase</Text>
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
        <View className="flex items-center justify-center">
          <Button.Secondary onPress={onCopyWords}>
            <Copy className=" text-brandAlt mr-4" />
            <Text className="text-brandAlt text-xl">Copia</Text>
          </Button.Secondary>
        </View>
      </View>
    </ScrollView>
  );
};

export default Mnemonic;

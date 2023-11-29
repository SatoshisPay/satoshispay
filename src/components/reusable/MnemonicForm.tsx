import React from 'react';
import { TextInput, Text, View } from 'react-native';

interface WordFormProps {
  number: number;
  word: string;
  readOnly: boolean;
  onWordChanged: (index: number, word: string) => void;
}
const WordForm = ({ number, word, onWordChanged, readOnly }: WordFormProps) => {
  return (
    <View className="flex flex-row items-center justify-between my-2">
      <Text className="text-xl">{number}.</Text>
      {readOnly ? (
        <Text className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl text-brandAlt">
          {word}
        </Text>
      ) : (
        <TextInput
          autoCapitalize="none"
          inputMode="text"
          className="flex-1 text-xl py-2.5 mx-4 text-center bg-white border border-gray-200 rounded-xl shadow-xl text-brandAlt"
          value={word}
          onChangeText={text => onWordChanged(number, text)}
        />
      )}
    </View>
  );
};

interface Props {
  mnemonic: string[];
  onMnemonicWordChanged: (number: number, word: string) => void;
  readOnly: number[];
}

const MnemonicForm = ({ mnemonic, readOnly, onMnemonicWordChanged }: Props) => (
  <View className="flex flex-col justify-center items-center">
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(1)}
          number={1}
          word={mnemonic[0]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(2)}
          number={2}
          word={mnemonic[1]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(3)}
          number={3}
          word={mnemonic[2]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(4)}
          number={4}
          word={mnemonic[3]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(5)}
          number={5}
          word={mnemonic[4]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(6)}
          number={6}
          word={mnemonic[5]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(7)}
          number={7}
          word={mnemonic[6]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(8)}
          number={8}
          word={mnemonic[7]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(9)}
          number={9}
          word={mnemonic[8]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(10)}
          number={10}
          word={mnemonic[9]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
    <View className="flex flex-row justify-around w-full pb-4">
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(11)}
          number={11}
          word={mnemonic[10]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
      <View className="w-6/12 flex flex-row items-center">
        <WordForm
          readOnly={readOnly.includes(12)}
          number={12}
          word={mnemonic[11]}
          onWordChanged={onMnemonicWordChanged}
        />
      </View>
    </View>
  </View>
);

export default MnemonicForm;

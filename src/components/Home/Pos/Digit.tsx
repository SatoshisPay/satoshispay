import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ButtonBox from './ButtonBox';

interface Props {
  onDigitClicked: (digit: number) => void;
  value: number;
  text?: string;
}

const Digit = (props: Props) => (
  <ButtonBox>
    <TouchableOpacity
      className="w-full active:bg-slate-200 p-4 active:rounded-xl"
      onPress={() => props.onDigitClicked(props.value)}>
      <Text className="text-4xl active:text-gray-800 text-brandAlt text-center">
        {props.text ? props.text : props.value}
      </Text>
    </TouchableOpacity>
  </ButtonBox>
);

export default Digit;

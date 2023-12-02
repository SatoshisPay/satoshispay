import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import ButtonBox from './ButtonBox';

interface Props {
  onClicked: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const ActionButton = (props: Props) => (
  <ButtonBox disabled={props.disabled}>
    <TouchableOpacity
      className="active:bg-slate-200 p-4"
      disabled={props.disabled}
      onPress={props.onClicked}>
      <Text className="text-center text-4xl">{props.children}</Text>
    </TouchableOpacity>
  </ButtonBox>
);

export default ActionButton;

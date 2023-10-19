import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check, X } from 'react-native-feather';

interface Props {
  onCancel: () => void;
  onDone: () => void;
}

const ButtonBar = (props: Props) => (
  <View className="flex flex-row justify-between w-full items-center my-8 px-8">
    <TouchableOpacity
      onPress={props.onCancel}
      className="rounded-full bg-red-500">
      <X className="text-white" width={96} height={96} />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={props.onDone}
      className="rounded-full bg-green-500">
      <Check className="text-white" width={96} height={96} />
    </TouchableOpacity>
  </View>
);

export default ButtonBar;

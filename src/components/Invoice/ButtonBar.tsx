import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Check, X } from 'react-native-feather';

interface Props {
  onCancel: () => void;
  onDone: () => void;
}

const ButtonBar = (props: Props) => (
  <View className="flex flex-row justify-between w-full items-center bg-white py-8 rounded-t-xl shadow-xl border-t border-gray-200">
    <View className="flex-1 mx-8">
      <TouchableOpacity
        onPress={props.onCancel}
        className="rounded-full bg-red-500 items-center w-min">
        <X className="text-white" width={96} height={96} />
      </TouchableOpacity>
    </View>
    <View className="flex-1 mx-8">
      <TouchableOpacity
        onPress={props.onDone}
        className="rounded-full bg-green-500 items-center">
        <Check className="text-white" width={96} height={96} />
      </TouchableOpacity>
    </View>
  </View>
);

export default ButtonBar;

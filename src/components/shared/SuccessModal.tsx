import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  onClick: () => void;
  message?: string;
}

const SuccessModal = (props: Props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.message !== undefined}
    onRequestClose={props.onClick}>
    <View className="flex flex-col items-center justify-center bg-green-100">
      <View className="flex flex-col items-center justify-center p-2 w-5/6">
        <Text className="text-green-500 text-xl text-center">
          {props.message}
        </Text>
        <TouchableOpacity
          onPress={props.onClick}
          className="border border-green-300 p-2 rounded-lg my-4 w-full">
          <Text className="text-green-500 text-2xl text-center">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SuccessModal;

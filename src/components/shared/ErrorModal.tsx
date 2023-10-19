import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';

interface Props {
  onClick: () => void;
  error?: string;
}

const ErrorModal = (props: Props) => (
  <Modal
    animationType="slide"
    transparent={true}
    visible={props.error !== undefined}
    onRequestClose={props.onClick}>
    <View className="flex flex-col items-center justify-center bg-red-100">
      <View className="flex flex-col items-center justify-center p-2 w-5/6">
        <Text className="text-red-500 text-2xl text-center">
          Si è verificato un errore!
        </Text>
        <Text className="text-red-500 text-xs py-2">{props.error}</Text>
        <Text className="text-red-500 text-2xl text-center">
          Riprova più tardi
        </Text>
        <TouchableOpacity
          onPress={props.onClick}
          className="border border-red-300 p-2 rounded-lg my-4 w-full">
          <Text className="text-red-500 text-2xl text-center">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default ErrorModal;
